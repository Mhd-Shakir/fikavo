
import pdf from '../../assets/fikavo brand guidline.pdf';
import Button from '../ui/Button';

const SurpriseBrandbookButton = () => {
  const handleClick = () => {
    window.open(pdf, '_blank');
  };  
  return (
    <div className="flex justify-center py-12 bg-gradient-to-b from-transparent to-slate-50/30">
      <Button onClick={handleClick} variant="arrow"  className="bg-brand-violet text-white hover:bg-brand-dark/10 shadow-lg shadow-brand-violet/20 hover:shadow-brand-violet/30 transition-shadow">
        Fikavo Brandbook
      </Button>
    </div>
  );
}
export default SurpriseBrandbookButton;