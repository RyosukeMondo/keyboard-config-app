import ftplib
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# FTP server details
FTP_HOST = os.getenv("FTP_HOST")
FTP_USER = os.getenv("FTP_USER")
FTP_PASS = os.getenv("FTP_PASS")

# Local directory to upload
LOCAL_DIR = os.path.join(os.getcwd(), os.getenv("LOCAL_DIR", ""))
REMOTE_DIR = os.getenv("REMOTE_DIR")


def upload_directory(ftp, local_dir, remote_dir):
    for root, dirs, files in os.walk(local_dir):
        relative_path = os.path.relpath(root, local_dir)
        remote_path = os.path.join(remote_dir, relative_path).replace("\\", "/")
        try:
            ftp.mkd(remote_path)
        except ftplib.error_perm:
            pass  # Ignore "directory already exists" errors
        for file in files:
            local_file = os.path.join(root, file)
            remote_file = os.path.join(remote_path, file).replace("\\", "/")
            print(f"Uploading {local_file} to {remote_file}")
            with open(local_file, 'rb') as f:
                ftp.storbinary(f"STOR {remote_file}", f)


def main():
    with ftplib.FTP(FTP_HOST, FTP_USER, FTP_PASS) as ftp:
        ftp.cwd(REMOTE_DIR)
        upload_directory(ftp, LOCAL_DIR, REMOTE_DIR)


if __name__ == "__main__":
    main()
