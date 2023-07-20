import sys
from web3.auto import w3

key_store_file_path = sys.argv[1]
print(key_store_file_path)
private_key = None

with open(key_store_file_path) as keyfile:
    enc_key = keyfile.read()
    private_key = w3.eth.account.decrypt(enc_key, 'password')

print(private_key.hex())