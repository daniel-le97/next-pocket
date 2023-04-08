/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { observer } from "mobx-react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { AppState } from "AppState";
import router from "next/router";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import CodeBlock from "~/utils/CodeBlock";
const AboutPage: NextPage = () => {
  const user = AppState.user;
  const servers = AppState.userServers;
  const [input, setInput] = useState("");
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  return (
    <main className="  min-h-screen dark:bg-zinc-800  ">
      <div className="flex">
        <textarea
          className=""
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <div className="container mt-4">
          <ReactMarkdown
            children={input as string}
            className="markdown"
            rehypePlugins={[rehypeRaw]}
            linkTarget="_blank"
            components={{
              code: ({ inline, className, children, ...props }) => {
                if (inline) {
                  return (
                    <code className="whitespace-normal text-gray-600 dark:text-zinc-300">
                      {children}
                    </code>
                  );
                }
                return (
                  <div className="markdown-container ">
                    <div className=" markdown-banner ">
                      {/* <span className="language-label">{language}</span> */}
                      <button
                       
                        className="markdown-copy-btn"
                      >
                        Copy
                      </button>
                    </div>
                    <CodeBlock
                      language={className && className.replace(/language-/, "")}
                      value={children}
                      {...props}
                    />
                  </div>
                );
              },
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default observer(AboutPage);
