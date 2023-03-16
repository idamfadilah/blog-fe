import { PublicKey } from "@solana/web3.js";

interface IAccount {
  author: PublicKey;
  timestamp: BigInt64Array;
  topic: String;
  content: String;
}

function Post(account: IAccount) {
  const { author, timestamp, topic, content } = account;

  function timestampToDate(timestamp: BigInt64Array) {
    const msSinceEpoch = Number(timestamp);
    return new Date(msSinceEpoch * 1000);
  }

  const formatRelativeTime = (timestamp: BigInt64Array) => {
    const datePost = timestampToDate(timestamp);
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
    <div className="flex flex-col border-t-2 border-neutral-900 py-6 px-12 bg-purple-200/50">
      <span className="text-xs font-semibold">Author</span>
      <span className="text-xs mb-5"> {author.toBase58()}</span>
      <div className="ml-3 border-l-4 border-indigo-500  mb-5 pl-3 py-3 bg-white-300">
        <h1 className="text-lg font-bold mb-2">{topic}</h1>
        <p className="">{content}</p>
      </div>
      <span className="text-sm self-end justify-self-end">
      {formatRelativeTime(timestamp)} 
      </span>
    </div>
  );
}

export default Post;
