package main

import (
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"time"

	"github.com/fsnotify/fsnotify"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

// Config holds the configuration settings
type Config struct {
	MonitorFile string `mapstructure:"monitor_file"`
	Destination string `mapstructure:"destination"`
	Log         string `mapstructure:"log"`
	LogLevel    string `mapstructure:"log_level"`
	PSScript    string `mapstructure:"ps_script"`
}

var (
	config Config
	log    = logrus.New()
)

func main() {
	// Initialize configuration
	err := initConfig()
	if err != nil {
		fmt.Printf("Error initializing config: %v\n", err)
		createTemplateConfig()
		fmt.Println("A template config.yaml has been created. Please configure it and restart the application.")
		os.Exit(1)
	}

	// Initialize logging
	err = initLogging()
	if err != nil {
		fmt.Printf("Error initializing logging: %v\n", err)
		os.Exit(1)
	}

	log.Info("Starting Folder Observer...")

	// Initialize file watcher
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatalf("Failed to create watcher: %v", err)
	}
	defer watcher.Close()

	// Add the directory of the monitor file to the watcher
	monitorDir := filepath.Dir(config.MonitorFile)
	err = watcher.Add(monitorDir)
	if err != nil {
		log.Fatalf("Failed to add directory to watcher: %v", err)
	}

	log.Infof("Monitoring file: %s", config.MonitorFile)

	done := make(chan bool)

	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				// We are interested in Write and Create events
				if (event.Op&fsnotify.Write == fsnotify.Write) || (event.Op&fsnotify.Create == fsnotify.Create) {
					// Check if the event is for the monitor file
					if filepath.Clean(event.Name) == filepath.Clean(config.MonitorFile) {
						log.Infof("Detected change in %s", config.MonitorFile)
						err := copyFile(config.MonitorFile, config.Destination)
						if err != nil {
							log.Errorf("Failed to copy file: %v", err)
							continue
						}
						log.Infof("Copied %s to %s", config.MonitorFile, config.Destination)

						// Execute PowerShell script
						err = executePSScript(config.PSScript)
						if err != nil {
							log.Errorf("Failed to execute PowerShell script: %v", err)
							continue
						}
						log.Infof("Executed PowerShell script: %s", config.PSScript)
					}
				}
			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				log.Errorf("Watcher error: %v", err)
			}
		}
	}()

	<-done
}

// initConfig initializes the configuration using Viper
func initConfig() error {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".") // Current directory

	// Set default values (optional)
	viper.SetDefault("log_level", "INFO")

	if err := viper.ReadInConfig(); err != nil {
		return err
	}

	err := viper.Unmarshal(&config)
	if err != nil {
		return err
	}

	return nil
}

// createTemplateConfig creates a template config.yaml file
func createTemplateConfig() {
	template := `# Configuration for Folder Observer

monitor_file: "C:\\Users\\ryosu\\Downloads\\key_assignments.txt"
destination: "C:\\Users\\ryosu\\yamy\\config.nodoka"
log: "C:\\Users\\ryosu\\yamy\\logs\\log.txt"
log_level: "DEBUG"  # Options: DEBUG, INFO, WARN, ERROR
ps_script: "C:\\Users\\ryosu\\yamy\\scripts\\manage_process.ps1"
`
	err := os.WriteFile("config.yaml", []byte(template), 0644)
	if err != nil {
		fmt.Printf("Failed to create template config.yaml: %v\n", err)
	}
}

// initLogging sets up the logging based on configuration
func initLogging() error {
	// Set log level
	level, err := logrus.ParseLevel(config.LogLevel)
	if err != nil {
		return fmt.Errorf("invalid log level: %v", err)
	}
	log.SetLevel(level)

	// Ensure log directory exists
	logDir := filepath.Dir(config.Log)
	err = os.MkdirAll(logDir, os.ModePerm)
	if err != nil {
		return fmt.Errorf("failed to create log directory: %v", err)
	}

	// Open log file
	file, err := os.OpenFile(config.Log, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		return fmt.Errorf("failed to open log file: %v", err)
	}

	// Set output to both stdout and file
	mw := io.MultiWriter(os.Stdout, file)
	log.SetOutput(mw)

	// Set log format
	log.SetFormatter(&logrus.TextFormatter{
		FullTimestamp: true,
	})

	return nil
}

func copyFile(src, dst string) error {
	// Ensure destination directory exists
	dstDir := filepath.Dir(dst)
	err := os.MkdirAll(dstDir, os.ModePerm)
	if err != nil {
		return fmt.Errorf("failed to create destination directory: %v", err)
	}

	// Open source file
	sourceFile, err := os.Open(src)
	if err != nil {
		return fmt.Errorf("failed to open source file: %v", err)
	}

	// Create destination file (truncate if exists)
	destFile, err := os.Create(dst)
	if err != nil {
		sourceFile.Close() // Ensure source file is closed if destination creation fails
		return fmt.Errorf("failed to create destination file: %v", err)
	}

	// Copy contents
	_, err = io.Copy(destFile, sourceFile)

	// Close both files before attempting to remove the source
	closeErr1 := sourceFile.Close()
	closeErr2 := destFile.Close()

	if err != nil {
		return fmt.Errorf("failed to copy contents: %v", err)
	}

	// Check for errors during file closure
	if closeErr1 != nil || closeErr2 != nil {
		return fmt.Errorf("error closing files: source close error: %v, destination close error: %v", closeErr1, closeErr2)
	}

	// Remove source file with retries
	for i := 0; i < 5; i++ {
		err = os.Remove(src)
		if err == nil {
			log.Infof("Successfully removed source file: %s", src)
			break
		}
		log.Warnf("Attempt %d: Failed to remove source file: %v", i+1, err)
		time.Sleep(time.Second)
	}

	if err != nil {
		return fmt.Errorf("failed to remove source file after retries: %v", err)
	}

	return nil
}

// executePSScript runs the PowerShell script
func executePSScript(scriptPath string) error {
	// Check if script exists
	if _, err := os.Stat(scriptPath); os.IsNotExist(err) {
		log.Warnf("PowerShell script does not exist: %s", scriptPath)
		return nil // Or decide to handle differently
	}

	var cmd *exec.Cmd
	if runtime.GOOS == "windows" {
		// Check if running as admin
		isAdmin, err := isRunningAsAdmin()
		if err != nil {
			return fmt.Errorf("failed to check admin rights: %v", err)
		}
		if !isAdmin {
			return fmt.Errorf("application must be run as administrator")
		}

		// Execute PowerShell script
		cmd = exec.Command("powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", scriptPath)
	} else {
		return fmt.Errorf("PowerShell script execution is only supported on Windows")
	}

	// Capture output and errors
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("PowerShell script error: %v, Output: %s", err, string(output))
	}

	log.Debugf("PowerShell script output: %s", string(output))
	return nil
}

// isRunningAsAdmin checks if the application is running with admin privileges
func isRunningAsAdmin() (bool, error) {
	if runtime.GOOS != "windows" {
		return false, fmt.Errorf("isRunningAsAdmin is only implemented for Windows")
	}

	cmd := exec.Command("net", "session")
	err := cmd.Run()
	if err != nil {
		// If the command fails, it's likely not running as admin
		return false, nil
	}
	return true, nil
}
