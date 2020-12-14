import Vue from 'vue'

export const Bus = new Vue()

// const queue: IMessageArgs[] = []

export interface IMessageOptions {
    color?: string;
    timeout?: number;
}

export interface IMessageData {
    message: string;
    color: string;
    timeout: number;
}

const Default: IMessageOptions = {
    color: '',
    timeout: 1500
}

export function sendMessage(message: string, opts?: IMessageOptions) {
    Bus.$emit('message', Object.assign({ message }, Default, opts))
}
