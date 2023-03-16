import blogIdl from "../blog.json";
import { PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Form from "../component/Form";
import Alert from "../component/Alert";
import Post from "../component/Post";
interface iPost {
  account: {
    author: PublicKey;
    content: string;
    timestamp: BigInt64Array;
    topic: string;
  };
  publicKey: PublicKey;
}

function Blog() {
  const idl: any = blogIdl;
  const PROGRAM_KEY = new PublicKey(idl.metadata.address);

  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const { connection } = useConnection();
  const [posts, setPosts] = useState<iPost[]>();
  const [error, setError] = useState<string>("");

  let program = new Program(idl, PROGRAM_KEY, { connection: connection });

  useEffect(() => {
    getAllPosts();
  }, []);

  const sendPost = async (topic: String, content: String) => {
    if (!publicKey || !signTransaction || !signAllTransactions) {
      return;
    }
    const signerWallet = {
      publicKey: publicKey,
      signTransaction: signTransaction,
      signAllTransactions: signAllTransactions,
    };
    const provider = new AnchorProvider(connection, signerWallet, {});
    program = new Program(idl, PROGRAM_KEY, provider);
    const postKey = web3.Keypair.generate();
    await program.rpc.sendPost(topic, content, {
      accounts: {
        post: postKey.publicKey,
        author: signerWallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [postKey],
    });
    getAllPosts();
  };

  const getAllPosts = async () => {
    await program.account.post
      .all()
      .then((posts) => {
        setPosts(
          (posts as iPost[]).sort(
            (a, b) => Number(b.account.timestamp) - Number(a.account.timestamp)
          )
        );
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const onClickPost = (topic: String, content: String) => {
    sendPost(topic, content).catch((err) => {
      setError(err.message);
    });
  };

  const onClickAlert = () => {
    setError("");
  };

  return (
    <div className="w-8/12 min-h-screen mx-auto break-words py-10 ">
      <WalletMultiButton />
      {error && <Alert onClickAlert={onClickAlert} message={error} />}
      {publicKey && <Form onClickPost={onClickPost} />}
      {posts?.map((data) => {
        return (
          <Post
            key={data.publicKey.toBase58()}
            author={data.account.author}
            topic={data.account.topic}
            content={data.account.content}
            timestamp={data.account.timestamp}
          />
        );
      })}
    </div>
  );
}

export default Blog;
