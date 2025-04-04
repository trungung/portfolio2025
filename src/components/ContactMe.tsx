"use client";

import {
  Copy,
  Mail,
  Phone,
  Check,
  MailOpen,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import LinkedinIcon from "@/icons/linkedin.png";
import { useState, ReactNode } from "react";
import { SiGithub } from "@icons-pack/react-simple-icons";

type ContactItemProps = {
  href: string;
  copyText: string;
  icon: ReactNode;
  label: string;
  target?: string;
};

const ContactItem = ({
  href,
  copyText,
  icon,
  label,
  target,
}: ContactItemProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 700);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" asChild className="group">
        <a href={href} target={target}>
          {icon} {label}
          <ExternalLink className="duration-200 group-hover:translate-x-1" />
        </a>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={copyToClipboard}
        title={`Copy ${label}`}
      >
        {copied ? (
          <Check className="text-green-700" />
        ) : (
          <Copy className="inline-block cursor-pointer" />
        )}
      </Button>
    </div>
  );
};

export const ContactMe = () => {
  const contactItems = [
    {
      href: "mailto:ungkientrung@gmail.com",
      copyText: "ungkientrung@gmail.com",
      icon: (
        <span>
          <Mail className="group-hover:hidden" />
          <MailOpen className="hidden group-hover:block" />
        </span>
      ),
      label: "ungkientrung@gmail.com",
    },
    {
      href: "tel:+358469305489",
      copyText: "+358 46 930 5489",
      icon: (
        <span>
          <Phone className="group-hover:hidden" />
          <PhoneCall className="hidden group-hover:block" />
        </span>
      ),
      label: "+358 46 930 5489",
    },
    {
      href: "https://www.linkedin.com/in/trung-ung/",
      copyText: "https://www.linkedin.com/in/trung-ung/",
      icon: (
        <Image
          src={LinkedinIcon}
          alt="LinkedIn"
          width={20}
          height={20}
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      label: "https://www.linkedin.com/in/trung-ung/",
      target: "_blank",
    },
    {
      href: "https://github.com/ung-trung",
      copyText: "https://github.com/ung-trung",
      icon: <SiGithub className="duration-200 group-hover:-rotate-12" />,
      label: "https://github.com/ung-trung",
      target: "_blank",
    },
  ];
  return (
    <section id="contact" className="mt-20 mb-16 scroll-mt-20">
      <h2 className="mb-2 box-decoration-clone bg-clip-text text-[1.7rem] font-bold">
        Contact me
        <span className="bg-gradient-to-r from-yellow-300 to-yellow-600 box-decoration-clone bg-clip-text text-transparent">
          .
        </span>
      </h2>
      <div className="max-w-prose">
        <p className="mt-4">
          I&apos;m always happy to connect. Whether you&apos;ve got a project in
          mind, an opportunity to share, or just want to say hi, I&apos;d love
          to hear from you.
        </p>
        <div className="mt-9 flex flex-col items-start gap-4">
          {contactItems.map((item) => (
            <ContactItem
              key={item.href}
              href={item.href}
              copyText={item.copyText}
              icon={item.icon}
              label={item.label}
              target={item.target}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
