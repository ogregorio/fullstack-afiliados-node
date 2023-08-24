async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: string[] = [];
    stream.on('data', (chunk: Buffer) => chunks.push(chunk.toString()));
    stream.on('error', (error: Error) => reject(error));
    stream.on('end', () => resolve(chunks.join('')));
  });
}

export default streamToString;
