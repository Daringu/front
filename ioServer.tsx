import io from 'socket.io-client';
import { URL } from './http';

export const ioServer = io(URL);