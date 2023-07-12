import ipfsClient from 'ipfs-http-client';

const ipfs = ipfsClient({ host: 'localhost', port: 5001, protocol: 'http' });

const file = new Blob(['Hello, world!'], { type: 'text/plain' });

const addResponse = await ipfs.add(file);

const ipfsHash = addResponse.cid.string;