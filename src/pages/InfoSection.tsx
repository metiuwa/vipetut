import { SeoToggle } from "../components/Common/Buttons/SeoToggle";

export const InfoSection = ({ onButtonClick, isSeoVisible }: { onButtonClick; isSeoVisible }) => {
  return (
    <div>
      {isSeoVisible && (
        <div className="absolute w-full bg-gray-800/[0.90] text-slate-200">
          
          <footer className="lg:text-left bottom-0 bg-gray-900/[0.7] text-center text-sm">
            
            <div className="pb-2 text-center text-neutral-500">
              <p>2024 VIP Akademi. Tüm hakları saklıdır.</p>
              <p>Bu site <a href="https://www.instagram.com/haasaan.dd" target="_blank"><span className="italic"><strong>Hasan</strong></span> </a> tarafından
              tasarlanmıştır.</p>
              
            </div>
            
           
          </footer>
        </div>
      )}
    </div>
  );
};
