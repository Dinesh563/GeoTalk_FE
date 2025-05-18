function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mb-0 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm">© 2025 Dinesh. All Rights Reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a
            href="https://www.linkedin.com/in/dinesh-durgaprasad-a1586519b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/dinesh563"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            GitHub
          </a>
          <a
            href="mailto:dineshdurgaprasad99@gmail.com"
            className="hover:text-gray-400"
          >
            Email Me
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;