import React, { useState, useEffect } from "react";
import NL1 from "../../assets/NL1.webp";
import NL2 from "../../assets/NL2.webp";
import NL3 from "../../assets/NL3.webp";
import NL4 from "../../assets/NL4.webp";
import NL5 from "../../assets/NL5.webp";
import NL6 from "../../assets/NL6.webp";
import {Newspaper} from "lucide-react";

export default function Rsidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  // 🔥 LOAD SUBSCRIPTION FROM LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("newsletterSubscribed");
    if (saved === "true") {
      setIsSubscribed(true);
    }
  }, []);

  // 🔥 SUBSCRIBE BUTTON
  const handleSubscribe = () => {
    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }
    setIsSubscribed(true);

    // 🔥 SAVE TO LOCAL STORAGE
    localStorage.setItem("newsletterSubscribed", "true");
  };

  return (
    <>
      {/* RIGHT SMALL BUTTON */}
      <div
  className="fixed top-[135px] right-0 w-12 lg:w-8 h-[calc(100vh-805px)] lg:h-[calc(100vh-165px)] bg-orange-500
             flex justify-center items-center cursor-pointer z-2000 rounded-l-2xl"
  onClick={() => setIsOpen(true)}
>
  {/* DESKTOP TEXT */}
  <div className="hidden lg:block rotate-90 text-white font-bold tracking-[12px]">
    NEWSLETTER
  </div>

  {/* MOBILE ICON */}
  <div className="block lg:hidden">
    <Newspaper className="w-6 h-6 text-white" />
  </div>
</div>


      {/* SIDEBAR PANEL */}
      <div
        className={`
          fixed top-[135px] right-0 w-100 h-[calc(100vh-305px)] lg:h-[calc(100vh-165px)] bg-white shadow-xl
          border-l border-gray-300 p-5 overflow-y-auto z-2001
          transition-transform duration-300 rounded-l-4xl
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* CLOSE BUTTON */}
        <div
          className="absolute top-3 left-3 text-xl cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </div>

        <h2 className="text-orange-500 font-bold text-2xl mt-5">Newsletter</h2>

        {!isSubscribed ? (
          <>
            <p className="text-gray-700 text-lg mt-2">
              Subscribe to unlock weekly food tips 🍽️
            </p>
            <h3>Email Address :-</h3>

            <input
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-0 border border-gray-300 rounded-lg outline-none"
            />

            <button
              onClick={handleSubscribe}
              className="w-full p-2 mt-3 bg-orange-500 text-white rounded-lg font-semibold"
            >
              Subscribe
            </button>
          </>
        ) : (
          <>
            <h3 className="text-green-600 font-semibold mt-3">🎉 Subscribed!</h3>
            <p className="text-gray-600 text-sm mt-2">
              Here are your newsletters:
            </p>

            <div className="mt-3 space-y-2 text-gray-700 overflow-y-scroll ">
                <a href="https://www.fooddive.com/news/heinz-leftover-gravy-Novak-Djokovic-cob-foods-athletic-brewing-pickle-nonalcoholic-beer/806155/" target="blank">
                    <div className="flex items-center border-b border-gray-500 pb-3 mb-5 hover:underline animated-underline">
                        <img src={NL1} className="w-30 h-fit" />
                        <h3 className="ml-2 mr-0">
                        <b>
                            Leftovers: Heinz offers squeezable gravy for Thanksgiving
                            leftovers | Novak Djokovic invests in sorghum snack
                        </b>
                        </h3>
                    </div>
                </a>

                <a href="https://www.fooddive.com/news/how-chips-ahoy-is-turning-to-innovation-stranger-things-to-connect-with-g/805052/" target="blank">
                    <div className="flex items-center border-b border-gray-500 pb-3 mb-5 hover:underline animated-underline">
                        <img src={NL2} className="w-30" />
                        <h3 className="ml-2 mr-0">
                        <b>
                            How Chips Ahoy! is reaching Gen Z snackers with
                            innovation, Stranger Things
                        </b>
                        </h3>
                    </div>
                </a>

                <a href="https://www.fooddive.com/news/magnum-ice-cream-prepares-for-a-new-frontier-after-spin-off-from-cpg-gian/802166/" target="blank">
                    <div className="flex items-center border-b border-gray-500 pb-3 mb-5 hover:underline animated-underline">
                        <img src={NL3} className="w-30 h-fit" />
                        <h3 className="ml-2 mr-0">
                        <b>
                            The Magnum Ice Cream Company prepares for a ‘new frontier’ after Unilever spin-off
                        </b>
                        </h3>
                    </div>
                </a>

                <a href="https://www.fooddive.com/news/hershey-closes-lesserevil-acquisition-as-it-looks-to-lead-the-future-of-sn/805814/" target="blank">
                    <div className="flex items-center border-b border-gray-500 pb-3 mb-5 hover:underline animated-underline">
                        <img src={NL4} className="w-30 h-fit" />
                        <h3 className="ml-2 mr-0">
                        <b>
                            Hershey closes LesserEvil acquisition as it looks to ‘lead the future of snacking’
                        </b>
                        </h3>
                    </div>
                </a>    

                <a href="https://www.fooddive.com/news/from-nutella-to-froot-loops-ferreros-push-for-sweet-snack-dominance-in-th/801807/" target="blank">
                    <div className="flex items-center border-b border-gray-500 pb-3 mb-5 hover:underline animated-underline">
                        <img src={NL5} className="w-30 h-fit" />
                        <h3 className="ml-2 mr-0">
                        <b>
                            Inside Ferrero’s push to become America’s next packaged food giant
                        </b>
                        </h3>
                    </div>
                </a>

                <a href="https://www.fooddive.com/news/tyson-climate-smart-sustainability-claims-settlement-beef/806055/" target="blank">
                    <div className="flex items-center border-b border-gray-500 pb-3 mb-5 hover:underline animated-underline">
                        <img src={NL6} className="w-30 h-fit" />
                        <h3 className="ml-2 mr-0">
                        <b>
                            Tyson to stop selling ‘climate-smart’ beef as part of lawsuit settlement
                        </b>
                        </h3>
                    </div>
                </a>
            </div>
            <div>
              <p className="text-orange-500 text-2x1">That's it for today....</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
