"use client";

import { useState, useEffect } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export function MDXContent({ source }: MDXContentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <MDXRemote {...source} />;
}
