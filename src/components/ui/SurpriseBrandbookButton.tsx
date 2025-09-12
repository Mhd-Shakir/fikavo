import { Download } from 'lucide-react';

const SurpriseBrandbookButton = () => {
  // Correct path to a file in the `public` folder
  const pdfUrl = '/assets/fikavo brand guidline.pdf';

  return (
    <div className="flex justify-center py-12 bg-gradient-to-b from-transparent to-slate-50/30">
      <a
        href={pdfUrl}
        download="Fikavo-Brandbook.pdf"
        // --- ALL STYLING AND HOVER CLASSES ARE NOW HERE ---
        className="
          inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
          bg-brand-violet text-white
          shadow-lg shadow-brand-violet/20
          transition-all duration-300
          hover:bg-brand-dark/80 hover:shadow-brand-violet/30 hover:-translate-y-1
        "
      >
        <Download size={20} />
        <span>Fikavo Brandbook</span>
      </a>
    </div>
  );
};

export default SurpriseBrandbookButton;