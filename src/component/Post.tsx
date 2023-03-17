import { PublicKey } from "@solana/web3.js";

interface IAccount {
  author: PublicKey;
  timestamp: BigInt64Array;
  topic: String;
  content: String;
}

function Post({ author, timestamp, topic, content }: IAccount) {

  function timestampToDate(timestamp: BigInt64Array) {
    const msSinceEpoch = Number(timestamp);
    return new Date(msSinceEpoch * 1000);
  }

  const formatRelativeTime = (date: Date) => {
    const datePost = date;
    const now = new Date();
    const diff = now.getTime() - datePost.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "a few seconds ago";
    }
  };

  return (
    <div>
      <span>Author</span>
      <span> {author.toBase58()}</span>
      <div>
        <h1>{topic}</h1>
        <p>{content}</p>
      </div>
      <span>{formatRelativeTime(timestampToDate(timestamp))}</span>
    </div>
  );
}

export default Post;
