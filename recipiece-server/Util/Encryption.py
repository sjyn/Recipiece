import base64
import bcrypt
from Crypto.Cipher import AES

from Util.Secrets import SECRET_KEY


def encrypt(value: bytes, nonce: bytes = None) -> (bytes, bytes):
    key = SECRET_KEY.encode('utf-8')
    cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
    nonce = cipher.nonce
    return cipher.encrypt(value), nonce


def decrypt(value: bytes, nonce: bytes) -> bytes:
    key = SECRET_KEY.encode('utf-8')
    cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
    return cipher.decrypt(value)


def encryptPassword(rawPassword: str, salt: bytes = None, nonce: bytes = None) -> (bytes, bytes, bytes):
    if salt is None:
        salt = genSalt()
    hashedPassword = hashValue(rawPassword, salt)
    encryptedPassword, nonce = encrypt(hashedPassword, nonce)
    return base64.b64encode(encryptedPassword), base64.b64encode(salt), base64.b64encode(nonce)


def comparePasswords(encryptedPassword: bytes, nonce: bytes, salt: bytes, rawPassword: str) -> bool:
    decodedSalt = base64.b64decode(salt)
    decodedNonce = base64.b64decode(nonce)
    actualEncrypted, _, _ = encryptPassword(rawPassword, salt=decodedSalt, nonce=decodedNonce)
    strippedExpected = encryptedPassword.rstrip(b'\x00')
    return actualEncrypted == strippedExpected


def genSalt() -> bytes:
    return bcrypt.gensalt()


def hashValue(raw: str, salt: bytes) -> bytes:
    return bcrypt.hashpw(raw.encode('utf-8'), salt)
