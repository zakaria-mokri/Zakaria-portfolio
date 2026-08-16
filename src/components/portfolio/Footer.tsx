import { contact, person } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border pb-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {person.name}. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href={`mailto:${contact.email}`} className="hover:text-foreground">
            Email
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
