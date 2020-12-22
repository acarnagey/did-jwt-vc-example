
export default async (timeout: number) => {
  return new Promise<void>((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve();
      }, timeout);
    } catch (err) {
      reject(err);
    }
  });
}
