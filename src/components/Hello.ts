import express from 'express';
import os from 'os';

const Hello = (_req : express.Request, res : express.Response) => {
    res.status(200).json({
        message: 'Hello World!',
        hostname: os.hostname(),
        platform: os.platform(),
    });
}

export default Hello;