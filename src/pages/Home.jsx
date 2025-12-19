import React from "react";
import HeroSection from "../Components/HeroSection/HeroSection";
import CategoriesDropdown from "../components/Categories/CategoriesDropdown";
import burger from "../assets/burger.png"
import Ramen2 from "../assets/ramen2.png"
import AutoSlider from "../components/AutoSlider"; 


export default function Home() {
  return (
    <div>
      <HeroSection />
      
      <section>
        <AutoSlider />
      </section>


        <div className="flex-col m-10 justify-center bg-black/5 rounded-3xl">
          <div className="flex-row">
            <h1 className="w-full text-center font-light text-3xl pt-8 ">Trending Foods This week</h1>
          </div>
        

        <div className="flex m-10 justify-center rounded-3xl">
          <div  className="flex-col  m-2 ">
            <a href="/recipe/53099">
              <div className="relative w-150 h-120 h-max-width rounded-4xl border-2 mb-4 bg-red-200 border-black/0 shadow-xl"><img src={burger} className=" "/> </div>
            </a>
            <div className="w-150 h-75 rounded-4xl mb-4 text-right">
                <h1 className="text-7xl font-extrabold mask-radial-from-neutral-500/80 underline mr-2 ">RAMEN</h1>
                <div className="flex justify-end m-5"> 
                  <div className="w-20 h-20 bg-gray-300 rounded-2xl m-2 flex flex-col justify-between shadow-xl"><div className="text-center mt-5 text-2xl font-bold text-gray-800/80">500K</div> <div className=" text-center mt-auto bg-gray-600 rounded-b-2xl text-white">Cals</div></div>
                  <div className="w-20 h-20 bg-gray-300 rounded-2xl m-2 flex flex-col justify-between shadow-xl"><div className="text-center mt-5 text-2xl font-bold text-gray-800/80">20g</div> <div className=" text-center mt-auto bg-gray-600 rounded-b-2xl text-white">Fats</div></div>
                  <div className="w-20 h-20 bg-gray-300 rounded-2xl m-2 flex flex-col justify-between shadow-xl"><div className="text-center mt-5 text-2xl font-bold text-gray-800/80">80g</div> <div className=" text-center mt-auto bg-gray-600 rounded-b-2xl text-white">Carbs</div></div>
                  <div className="w-20 h-20 bg-gray-300 rounded-2xl m-2 flex flex-col justify-between shadow-xl"><div className="text-center mt-5 text-2xl font-bold text-gray-800/80">25g</div> <div className=" text-center mt-auto bg-gray-600 rounded-b-2xl text-white">Protein</div></div>
                </div>
                <div className="text-gray-500 text-right">Ramen is a flavorful japanese noodle dish made with wheat noodles served in a rich broth, topped with ingredients like soft-boiled eggs, meat slices, spring onions, and spices, Its Known for its comforting taste and customizable toppings.</div>
            </div>
          </div>


          <div className=" flex-col m-2">
            <div className="w-150 h-75 rounded-4xl mb-4  ">
                <h1 className="text-7xl font-extrabold mask-radial-from-neutral-500/80 underline">VEG BURGER</h1>
                <div className="flex m-5"> 
                  <div className="w-20 h-20 bg-gray-300 rounded-2xl m-2 flex flex-col justify-between shadow-xl"><div className="text-center mt-5 text-2xl font-bold text-gray-800/80">300K</div> <div className=" text-center mt-auto bg-gray-600 rounded-b-2xl text-white">Cals</div></div>
                  <div className="w-20 h-20 bg-gray-300 rounded-2xl m-2 flex flex-col justify-between shadow-xl"><div className="text-center mt-5 text-2xl font-bold text-gray-800/80">12g</div> <div className=" text-center mt-auto bg-gray-600 rounded-b-2xl text-white">Fats</div></div>
                  <div className="w-20 h-20 bg-gray-300 rounded-2xl m-2 flex flex-col justify-between shadow-xl"><div className="text-center mt-5 text-2xl font-bold text-gray-800/80">30g</div> <div className=" text-center mt-auto bg-gray-600 rounded-b-2xl text-white">Carbs</div></div>
                  <div className="w-20 h-20 bg-gray-300 rounded-2xl m-2 flex flex-col justify-between shadow-xl"><div className="text-center mt-5 text-2xl font-bold text-gray-800/80">10g</div> <div className=" text-center mt-auto bg-gray-600 rounded-b-2xl text-white">Protein</div></div>
                </div>
                <div className="text-gray-500"> A veg burger is made with a patty of mashed vegetables like potatoes, peas, carrots, and spices, served inside a soft bun with lettuce, tomato, onions, and sauces. It's a lighter, vegetarian-friendly alternative to meat Burgers.</div>
            </div>
            
            <a href="https://www.justonecookbook.com/easy-tonkotsu-ramen-recipe/#wprm-recipe-container-249407">
              <div className="w-150 h-120 h-max-width rounded-4xl  bg-amber-600/30 shadow-xl "><img src={Ramen2} className="w-120 m-auto"/> </div>
            </a>
          </div>
        </div>
        </div>
    </div>
  );
}
