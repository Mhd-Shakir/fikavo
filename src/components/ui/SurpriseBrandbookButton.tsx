import Button from '../ui/Button';

const SurpriseBrandbookButton = () => {
  // Use the direct link as a string
  const pdfUrl = "https://drive.google.com/file/d/1WZxs7o2vqQrX3PMB4c3QHMeBfBE-CHec/view?usp=sharing";

  const handleClick = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="flex justify-center py-12 bg-gradient-to-b from-transparent to-slate-50/30">
      <Button
        onClick={handleClick}
        variant="arrow"
        className="bg-brand-violet text-white hover:bg-brand-dark/10 shadow-lg shadow-brand-violet/20 hover:shadow-brand-violet/30 transition-shadow"
      >
        Fikavo Brandbook
      </Button>
    </div>
  );
};

export default SurpriseBrandbookButton;
