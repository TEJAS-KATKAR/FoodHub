import { useState, useRef, useEffect } from "react";

/* ======================================================
   BLOCK 1: BACKUP AI RESPONSE DATA (IMPROVED)
   - Longer, human-like answers
   - Explains why recipe is good
   - Mentions ease, ingredients, and usage
====================================================== */

const foodResponses = [
  
{
  id: "rice",
  aliases: ["rice", "biryani", "pulao", "veg biryani", "rice recipe", "rice dish","food", "lunch", "dinner", "indian", "pulao"],
  responses: [
    {
        text: "<strong>Veg Fried Rice</strong> is one of the most popular rice dishes because it’s <strong>quick to make</strong> and doesn’t need many ingredients. With <strong>cooked rice, mixed vegetables, soy sauce, oil, and basic spices</strong>, you can prepare a <strong>satisfying meal</strong> in very little time.",
        images: ["https://www.sharmispassions.com/wp-content/uploads/2013/04/EggFriedRice4-500x500.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEm0xZC13Rb6YCxLddV0_agiask8g338KNnQ&s"]
    },
    {
        text: "<strong>Veg Biryani</strong> is a go-to choice when you want something <strong>flavorful and filling</strong>. It combines <strong>rice, vegetables, whole spices, and aromatic masalas</strong> into a <strong>complete meal</strong> that works well for <strong>lunch or dinner</strong>.",
        images: ["https://www.cookingcarnival.com/wp-content/uploads/2025/09/Vegetable-Dum-Biryani-5.jpg", "https://www.madhuseverydayindian.com/wp-content/uploads/2022/11/easy-vegetable-biryani.jpg"]
    },
    {
        text: "<strong>Rice-based meals</strong> are great because they are <strong>flexible</strong>. You can keep them <strong>light</strong> or make them <strong>rich</strong> depending on the <strong>ingredients, vegetables, and spices</strong> you use.",
        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFxYfXstvwtZ988b9cR00ehaX30Em9NdXhWQ&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyG9aUdgy00OBz_nHf46nR4ruQAhXtdxG7HA&s"]
    },
    {
        text: "If you’re looking for <strong>comfort food</strong>, <strong>Vegetable Pulao</strong> is always a <strong>safe option</strong>. It is <strong>easy to digest</strong> and can be <strong>customized easily</strong> using simple ingredients like <strong>rice, mixed vegetables, mild spices, and whole spices</strong>.",
        images: ["https://www.indianveggiedelight.com/wp-content/uploads/2019/07/veg-pulao-featured.jpg", "https://cdn1.foodviva.com/static-content/food-images/rice-recipes/vegetable-pulav-recipe/vegetable-pulav-recipe.jpg"]
    },

    {
        text: "<strong>Jeera Rice</strong> is ideal when you want something <strong>homemade</strong>, <strong>filling</strong>, and <strong>not overly complicated</strong>. It is usually prepared with <strong>rice, cumin seeds, ghee, and basic pantry ingredients</strong> using minimal effort.",
        images: ["https://www.whiskaffair.com/wp-content/uploads/2021/06/Jeera-Rice-2-3-1.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXRSlgXV7T76f5yxUoh8dPzre_1W1csfyo3g&s"]
    }

    ]
},


  {
  id: "paneer",
  aliases: ["paneer", "cottage cheese", " recipe", "dish", "food", "veg protein","vegetarian", " protein", "cottage cheese", " curry", "sabzi"],
  responses: [
  {
    text: "<strong>Paneer Bhurji</strong> is extremely popular because <strong>paneer is rich in protein</strong> and very <strong>versatile</strong>. It works well as a <strong>quick meal or side dish</strong>, usually prepared with <strong>crumbled paneer, spices, onions, tomatoes, and vegetables</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ5LjDC1kq77EluvOq3z9M-J-k8wUwMZ7L0A&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQohI_LPAnsZ2ZzY-gxqxSvIIInt7tF1vYTw&s"]
  },
  {
    text: "<strong>Paneer Butter Masala</strong> is loved for its <strong>creamy texture</strong> and <strong>balanced flavor</strong>. It’s often chosen when someone wants a <strong>rich vegetarian meal</strong>, made using <strong>paneer, tomatoes, butter, cream, and aromatic spices</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_JfZHtD_jlggLqhDlthd7Jg2o4gt7OrWH7w&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU2GVSX6yMjCLHtHBaQwyqjUw1rkC1sF9H8g&s"]
  },
  {
    text: "<strong>Paneer Tikka</strong> is a good option when you want something <strong>filling</strong> without using <strong>meat</strong>, as paneer provides <strong>good protein</strong> and works well with <strong>simple spices, vegetables, and marinades</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYAud3G3kRsjZe3N5xs6NHI4uw-wx0BqJb1Q&s", "https://lentillovingfamily.com/wp-content/uploads/2025/08/paneer-tikka-2.jpg"]
  },
  {
    text: "<strong>Paneer Curry</strong> recipes are <strong>easy to adapt</strong> depending on how <strong>spicy or mild</strong> you want the dish, using ingredients like <strong>paneer, onions, tomatoes, and basic masalas</strong>.",
    images: ["https://www.funfoodfrolic.com/wp-content/uploads/2022/08/Paneer-Curry-Blog.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0o9EKmZ4jVpIE1VKz3dhbPvi6TlxxSJsiOA&s"]
  },
  {
    text: "<strong>Shahi Paneer</strong> is commonly used in <strong>restaurant-style recipes</strong> because <strong>paneer absorbs flavors well</strong>, where it is cooked with <strong>rich gravies, spices, cream, and sauces</strong> to enhance taste.",
    images: ["https://static.toiimg.com/thumb/52446409.cms?imgsize=1355096&width=800&height=800", "https://indianshealthyrecipes.com/wp-content/uploads/2024/07/ShahiPaneer-3.jpg"]
  }
]


},

{
  id: "noodles",
  aliases: ["noodles", "ramen", "chowmein", " nodles", "raman", "instant", "quick ", "fast ", "night", "late night food", "chowmein"],
  responses: [
  {
    text: "<strong>Veg Hakka Noodles</strong> are a popular choice when you want something <strong>quick and satisfying</strong>. They cook <strong>fast</strong> and require <strong>minimal preparation</strong>, usually made with <strong>noodles, vegetables, oil, and simple sauces</strong>.",
    images: ["https://www.whiskaffair.com/wp-content/uploads/2020/10/Veg-Hakka-Noodles-2-3.jpg", "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/hakka-noodles-recipe.jpg"]
  },
  {
    text: "<strong>Veg Chowmein</strong> is commonly made using <strong>vegetables and sauces</strong> that are easily available, such as <strong>capsicum, cabbage, carrots, soy sauce, and seasoning</strong>, making it perfect for <strong>busy days</strong>.",
    images: ["https://i0.wp.com/mommyskitchenstory.com/wp-content/uploads/2022/02/IMG_20220209_170903_116.webp?fit=1024%2C1024&ssl=1", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5yOy9irKafeBSA1UD8CaNgAYeeQT6QgTCbw&s"]
  },
  {
    text: "<strong>Stir-Fried Veg Noodles</strong> are <strong>flexible</strong>—you can keep them <strong>simple</strong> or add more ingredients like <strong>vegetables, sauces, or protein</strong> to make them more <strong>filling</strong>.",
    images: ["https://img.taste.com.au/UZVXAdo7/taste/2016/11/chinese-egg-noodle-and-vegetable-stir-fry-94186-1.jpeg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbnbaOcaeXVNy54HxvZa5YLI6S97AxU-Nagw&s"]
  },
  {
    text: "Because <strong>Veg Garlic Noodles</strong> are <strong>fast to cook</strong>, they are often preferred for <strong>late-night meals</strong> or <strong>quick lunches</strong>, especially when you don’t want long cooking time.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa763mQyFxMUxHMIRIqx_wYjOaeGJVZB_Gfg&s", "https://www.funfoodfrolic.com/wp-content/uploads/2020/09/Garlic-Noodles-Thumbnail.jpg"]
  },
  {
    text: "<strong>Veg Schezwan Noodles</strong> work well for people who want a <strong>light yet tasty meal</strong>, prepared with <strong>basic ingredients</strong> and quick cooking methods.",
    images: ["https://hotelbeachgarden.com/wp-content/uploads/2024/12/Veg-Szechuan-Fried-Noodles.webp", "https://www.cookwithmanali.com/wp-content/uploads/2021/08/Schezwan-Noodles-500x500.jpg"]
  }
]


},


  {
  id: "burger",
  aliases: ["burger", "fast", "junk", "snack", "evening ", "street"],
  responses: [
  {
    text: "<strong>Veg Aloo Tikki Burger</strong> is popular because it is <strong>easy to eat</strong> and very <strong>filling</strong>. A good burger combines a <strong>soft bun</strong> with a <strong>flavorful aloo patty</strong>, along with ingredients like <strong>vegetables, sauces, and seasoning</strong>.",
    images: ["https://thumbs.dreamstime.com/b/indian-street-style-veg-burger-spicy-aloo-tikki-fresh-toppings-401371273.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHpUSfGFXMo7g-jXEegx6f-2iPPL5Nsm7LGg&s"]
  },
  {
    text: "<strong>Classic Veg Burger</strong> is often chosen as a <strong>quick snack or meal</strong>, especially when you don’t want <strong>heavy cooking</strong>, and is usually made using <strong>veg patties, buns, lettuce, and sauces</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfg9B6xzfanVTpi-C4uuDtjNfBxtZA9KA57w&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHpUSfGFXMo7g-jXEegx6f-2iPPL5Nsm7LGg&s"]
  },
  {
    text: "<strong>Cheese Veg Burger</strong> is <strong>customizable</strong>—you can adjust the <strong>fillings and sauces</strong> based on your taste, using ingredients like <strong>cheese, vegetables, and different spreads</strong>.",
    images: ["https://img.freepik.com/free-photo/front-view-vegetarian-burger-counter-with-tomatoes_23-2148784525.jpg?semt=ais_hybrid&w=740&q=80", "https://images.immediate.co.uk/production/volatile/sites/30/2020/10/Secret-Veg-Cheeseburgers-c981dd6.jpg"]
  },
  {
    text: "Because <strong>Homemade Veg Burger</strong> is <strong>simple to assemble</strong>, it is great for <strong>home cooking</strong> too, requiring only <strong>buns, patties, basic vegetables, and sauces</strong>.",
    images: ["https://i.pinimg.com/474x/8f/ba/b5/8fbab5059965d76082a046dc58627338.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxl6tpegKPahjF-0sjmMH9k-xQRKQet5O1sw&s"]
  },
  {
    text: "<strong>Street-Style Veg Burger</strong> is commonly searched when someone wants <strong>fast food options</strong>, as it is <strong>convenient</strong> and satisfying to eat.",
    images: ["https://img.freepik.com/free-photo/close-up-vegetarian-burger-cutting-board_23-2148784533.jpg", "https://thumbs.dreamstime.com/b/indian-street-style-veg-burger-spicy-aloo-tikki-fresh-toppings-401371273.jpg"]
  }
]


},


  
 {
  id: "pizza",
  aliases: ["pizza","cheese", "fast", "junk", "party", "comfort ", "food"],
  responses: [
  {
    text: "<strong>Veg Loaded Pizza</strong> is one of the most searched foods because it’s <strong>filling</strong> and <strong>customizable</strong>. You can choose toppings based on your preference, such as <strong>vegetables, cheese, sauces, and seasoning</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgL46S7QViEcBIjmMlnqM_3ssQj7Be6DtXKg&s", "https://boliya.in/wp-content/uploads/2025/05/Loaded-Pizza-Veg.png"]
  },
  {
    text: "<strong>Homemade Veg Pizza</strong> works well as a <strong>comfort food</strong> and is commonly prepared at home using <strong>simple ingredients</strong> like <strong>pizza base, cheese, vegetables, and sauce</strong>.",
    images: ["https://www.tasteofhome.com/wp-content/uploads/2025/03/48-Homemade-Pizza-Recipes_FT23_376_EC_120123_1_FT.jpg", "https://wp-cdn.typhur.com/wp-content/uploads/2025/01/homemade-pizza-in-air-fryer-500x500.jpg"]
  },
  {
    text: "<strong>Cheese Burst Pizza</strong> is often chosen for <strong>group meals</strong> because it’s <strong>easy to share</strong>, making it a popular option for <strong>friends and family gatherings</strong>.",
    images: ["https://i.pinimg.com/736x/eb/ee/e8/ebeee82a42e0428d299f86ab74faf77a.jpg", "https://recipesblob.oetker.in/assets/89398df9d59d4a4795357ed8228c04bb/750x910/cheese-burst-pizza.webp"]
  },
  {
    text: "Because <strong>Veg Supreme Pizza</strong> allows many <strong>topping combinations</strong>, it never feels <strong>boring</strong> and can be customized using <strong>different vegetables, cheeses, and sauces</strong>.",
    images: ["https://www.secondrecipe.com/wp-content/uploads/2021/10/air-fryer-pizza-1-500x500.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvKrvYyLC_eyksYv5xOegtAIjYj6NjHBm-Qg&s"]
  },
  {
    text: "<strong>Classic Margherita Pizza</strong> is usually searched when someone wants something <strong>satisfying</strong> and <strong>familiar</strong>, prepared with <strong>well-known ingredients</strong> and flavors.",
    images: ["https://veenaazmanov.com/wp-content/uploads/2020/04/Classic-Pizza-Margherita1.jpg", "https://uk.ooni.com/cdn/shop/articles/20220211142645-margherita-9920_e41233d5-dcec-461c-b07e-03245f031dfe.jpg?crop=center&height=800&v=1737105431&width=800"]
  }
]


},

 {
  id: "sandwich",
  aliases: ["sandwich","sandwhich",'bread',"light", "lighter", "veg", "bread", "light", "breakfast", "quick", "easy", "healthy", "snack", "morning", "food"],
  responses: [
  {
    text: "<strong>Veg Grilled Sandwich</strong> is popular because it is <strong>quick to prepare</strong> and <strong>easy to eat</strong>, usually made with <strong>bread, vegetables, butter, and spreads</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxytze_-ZqOcDCuDpKhIR7Ga8Mvo91lNrh-w&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBfVd8-DtkN3uCzza6uBGRxgNM699B_VJaw&s"]
  },
  {
    text: "<strong>Veg Club Sandwich</strong> is often chosen for <strong>breakfast</strong> or <strong>light meals</strong>, prepared using <strong>bread, fresh vegetables, butter, or chutney</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt7HgF4sEx30dDObnKnJU4JKbeoCfoiSzN7g&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMwSmY1VtV88ui1qwNVwHcI4UnrTmAZKFisw&s"]
  },
  {
    text: "<strong>Plain Veg Sandwich</strong> requires <strong>very few ingredients</strong> and <strong>minimal cooking</strong>, making it easy to prepare with <strong>bread, vegetables, and simple fillings</strong>.",
    images: ["https://img.freepik.com/free-photo/side-view-club-sandwich-with-salted-cucumbers-lemon-olives-round-white-plate_176474-3049.jpg?semt=ais_hybrid&w=740&q=80", "https://www.foodandwine.com/thmb/gv06VNqj1uUJHGlw5e7IULwUmr8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2012-r-xl-vegetable-sandwich-with-dill-sauce-2000-0984c1b513ae4af396aee039afa5e38c.jpg"]
  },
  {
    text: "Because <strong>Veg Toast Sandwich</strong> is <strong>flexible</strong>, it works for both <strong>snacks</strong> and <strong>meals</strong>, depending on the <strong>fillings and spreads</strong> you use.",
    images: ["https://www.sharmispassions.com/wp-content/uploads/2021/04/VegSandwich2.jpg", "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/veg-grilled-sandwich-recipe.jpg"]
  },
  {
    text: "<strong>Street-Style Veg Sandwich</strong> is commonly searched when someone wants something <strong>fast</strong>, convenient, and prepared with <strong>basic kitchen ingredients</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxIY5mLpk0qEgBfDsBpfHJP-ouGz1tr4yJxA&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXvYtWG6QyXsDMoonvrMFDLXMMd1sI2iw18A&s"]
  }
]


},

{
  id: "samosa",
  aliases: ["samosa", "evening", "tea","snack", "street", "fried", "indian"],
  responses: [
  {
    text: "<strong>Classic Aloo Samosa</strong> is a very popular <strong>snack</strong> known for its <strong>crispy texture</strong> and <strong>spicy filling</strong>, usually made with <strong>potatoes, spices, and a flaky outer covering</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREsG7LB1-B9eLB9PbqfomZfU64cm7p7ZfyIw&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFPP0wyCOQefudUz7vjo9QtLIXPz9BWoY_g&s"]
  },
  {
    text: "<strong>Punjabi Samosa</strong> is often eaten as <strong>evening snacks</strong> or during <strong>gatherings</strong>, freshly prepared using <strong>potato filling, spices, and deep-fried pastry</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUjCxq9xUgjuHUxoNpUE-VcywTv1z07GnP4w&s", "https://ministryofcurry.com/wp-content/uploads/2025/08/samosa-6.jpg"]
  },
  {
    text: "Because <strong>Street-Style Aloo Samosa</strong> is <strong>filling</strong>, even <strong>one or two</strong> can satisfy hunger, thanks to the <strong>potato stuffing and fried outer layer</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREsG7LB1-B9eLB9PbqfomZfU64cm7p7ZfyIw&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFPP0wyCOQefudUz7vjo9QtLIXPz9BWoY_g&s"]
  },
  {
    text: "<strong>Indian Street Samosa</strong> is widely searched because it is <strong>iconic street food</strong>, commonly sold and enjoyed with <strong>spicy fillings and crispy texture</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREsG7LB1-B9eLB9PbqfomZfU64cm7p7ZfyIw&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFPP0wyCOQefudUz7vjo9QtLIXPz9BWoY_g&s"]
  },
  {
    text: "<strong>Chaat-Style Samosa</strong> is usually paired with <strong>chutneys</strong> for extra flavor, such as <strong>mint chutney, tamarind chutney, or sauces</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlqVZuk--r2_lu7D5VhGix4N-7Ne54GuTdQg&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0w9PekOOKBE1epio_07G3qdg2-CaLE82n4Q&s"]
  }
]
},
{
  id: "pasta",
  aliases: ["pasta","white", "sauce", "italian", "comfort","food", "easy"," dinner", "recipe","snacks"],
  responses: [
  {
    text: "<strong>White Sauce Pasta</strong> is popular because it’s <strong>easy to cook</strong> and works well with <strong>many sauces</strong>, such as <strong>white sauce, red sauce, or simple oil-based sauces</strong>.",
    images: ["https://www.cookwithkushi.com/wp-content/uploads/2016/07/best_white_sauce_pasta_bechamel_sauce.jpg", "https://www.indianveggiedelight.com/wp-content/uploads/2022/12/white-sauce-pasta-featured.jpg"]
  },
  {
    text: "<strong>Veg Red Sauce Pasta</strong> is often chosen when someone wants a <strong>quick</strong> and <strong>filling meal</strong>, prepared using <strong>pasta, vegetables, sauce, and basic seasoning</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY416IBgLBkJcFI5YbsP9NuiNeIaC8GBxpyw&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNobsgh18y1843Orw2FsmRULoclDTJOg3iA&s"]
  },
  {
    text: "<strong>Creamy Cheese Pasta</strong> can be kept <strong>light</strong> or made <strong>rich</strong> depending on the <strong>sauce</strong>, using ingredients like <strong>cream, cheese, tomatoes, or olive oil</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkGuM4FzqtvuzDLazIyFwruNBCLJukhehNw&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOe-YLykVHEQK5GvaUuoZVieaaO-thRpPa3Q&s"]
  },
  {
    text: "<strong>Classic Italian Pasta</strong> is commonly searched as a <strong>comfort food option</strong>, especially when prepared with <strong>familiar flavors and sauces</strong>.",
    images: ["https://urbanblisslife.com/wp-content/uploads/2016/10/Rigatoni-with-Italian-Sausage-2022-FEATURE.jpg", "https://www.realfoodwithsarah.com/wp-content/uploads/2024/05/authentic-italian-pasta-sauce-3.jpg"]
  },
  {
    text: "<strong>Veg Masala Pasta</strong> works well for both <strong>lunch</strong> and <strong>dinner meals</strong>, as it is <strong>easy to prepare</strong> and satisfying to eat.",
    images: ["https://www.vegrecipesofindia.com/wp-content/uploads/2017/03/indian-style-masala-pasta-recipe1.jpg", "https://holycowvegan.net/wp-content/uploads/2025/04/masala-pasta-2.jpg"]
  }
]


},

{
  id: "chicken",
  aliases: ["chicken", "meat", "steak", "pork" ,"non" ,"nonveg" ,"nonvegitarian","protein",'grilled'],
  responses: [
  {
    text: "<strong>Chicken Curry</strong> is popular because <strong>chicken is easy to cook</strong> and <strong>absorbs flavors well</strong>, especially when prepared with <strong>spices, herbs, oil, and basic marinades</strong>.",
    images: ["https://spicecravings.com/wp-content/uploads/2025/07/Coconut-Curry-Chicken-New-Featured.jpg", "https://butfirstchai.com/wp-content/uploads/2023/01/chicken-chettinad-curry-recipes.jpg"]
  },
  {
    text: "<strong>Grilled Chicken</strong> recipes are often searched when someone wants a <strong>protein-rich meal</strong>, as chicken provides <strong>good protein</strong> and works well with <strong>simple spices and seasonings</strong>.",
    images: ["https://kristineskitchenblog.com/wp-content/uploads/2023/05/grilled-chicken-recipe-25.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzFu_9xepJB1ePXg_UxEiFth25KPc1R7WbrQ&s"]
  },
  {
    text: "<strong>Chicken Tikka</strong> can be cooked in <strong>many ways</strong>, making it very <strong>versatile</strong>, whether it is <strong>grilled, pan-fried, baked, or cooked in curry</strong>.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_7EmdH71bX6lKH9qRzkm70schQnx1_q05Ug&s", "https://www.whiskaffair.com/wp-content/uploads/2020/06/Chicken-Tikka-2-3.jpg"]
  },
  {
    text: "<strong>Butter Chicken</strong> is suitable for both <strong>quick meals</strong> and <strong>special occasions</strong>, depending on the <strong>cooking style and ingredients</strong> used.",
    images: ["https://www.indianhealthyrecipes.com/wp-content/uploads/2023/04/butter-chicken-recipe.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsdHbLpoZ41iDhrAmMy7KT0OX3sgHek0FWwg&s"]
  },
  {
    text: "<strong>Home-Style Chicken Masala</strong> is commonly chosen because it <strong>balances taste and nutrition</strong>, especially when cooked using <strong>fresh ingredients and controlled spices</strong>.",
    images: ["https://static.toiimg.com/thumb/54673639.cms?imgsize=497063&width=800&height=800", "https://www.whiskaffair.com/wp-content/uploads/2021/01/Chicken-Masala-2-3-1.jpg"]
  }
]


},

{
  id: "fish",
  aliases: ["fish", "seafood","sea", "non" ,"non-veg" ,"nonvegitarian","protein"],
  responses: [
  {
    text: "<strong>Fish Fry</strong> is popular because it is <strong>light</strong> and <strong>cooks relatively quickly</strong>, usually prepared using <strong>fish, oil, basic spices, and herbs</strong>.",
    images: ["https://tiffinandteaofficial.com/wp-content/uploads/2024/04/Untitled-1-1.jpg", "https://butteroverbae.com/wp-content/uploads/2018/11/spicy-fish-fry-served.jpg"]
  },
  {
    text: "<strong>Grilled Fish</strong> recipes are often searched by people looking for <strong>healthier meal options</strong>, as fish is commonly cooked with <strong>minimal oil, spices, and fresh ingredients</strong>.",
    images: ["https://www.masalakorb.com/wp-content/uploads/2016/08/Grilled-Fish-Indian-Recipe-V5.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFOe91CbnUN8WLf0KkabzCLDHxXmO5jP5PqA&s"]
  },
  {
    text: "<strong>Fish Curry</strong> absorbs <strong>spices well</strong> and doesn’t require <strong>long cooking time</strong>, making it easy to prepare with <strong>simple marinades, spices, and quick cooking methods</strong>.",
    images: ["https://www.whiskaffair.com/wp-content/uploads/2018/06/Alleppey-Fish-Curry-2-3.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnLV_Dq4nc6uUZ0RD9IPp96gGGv7JAKDj47A&s"]
  },
  {
    text: "<strong>Pan-Fried Fish</strong> works well for both <strong>lunch</strong> and <strong>dinner</strong>, depending on the <strong>cooking style and seasoning</strong> used.",
    images: ["https://shahzadidevje.com/wp-content/uploads/2023/01/Pan-Fried-Basa-Fish-Fillets-3-500x500.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJCrjHBFk1xpZJsI2Awc3z83J0gI9nJSU2A&s"]
  },
  {
    text: "<strong>Home-Style Fish Masala</strong> is commonly chosen for its <strong>balance of taste and nutrition</strong>, especially when cooked with <strong>fresh fish, mild spices, and healthy oils</strong>.",
    images: ["https://shahzadidevje.com/wp-content/uploads/2023/01/Pan-Fried-Basa-Fish-Fillets-3-500x500.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJCrjHBFk1xpZJsI2Awc3z83J0gI9nJSU2A&s"]
  }
]
}

];


/* ======================================================
   BLOCK 2: MEMORY TO PREVENT REPEATED ANSWERS
   - Keeps track of which responses were already used
   - This makes replies feel less robotic
====================================================== */

const usedReplies = {};

/* ======================================================
   BLOCK 3: BACKUP AI BRAIN (IMPROVED LOGIC)
   - Food-topic guard
   - Unsupported food handling
   - Known food → full responses
====================================================== */
/* ======================================================
   BLOCK 3: BACKUP AI BRAIN (FIXED & WORKING)
====================================================== */

const foodKeywords = [
  "food",
  "recipe",
  "cook",
  "rice",
  "biryani",
  "paneer",
  "noodles",
  "burger",
  "pizza",
  "sandwich",
  "samosa",
  "pasta",
  "chicken",
  "fish",
  "meat"
];

const unsupportedFoods = ["wheat"];

function getBackupAIResponse(message) {
  const msg = message.toLowerCase();

  // 1️⃣ CHECK AGAINST FOOD ALIASES FIRST
  for (let food of foodResponses) {
    const matched = food.aliases.some(alias =>
      msg.includes(alias.toLowerCase())
    );

    if (matched) {
      if (!usedReplies[food.id]) usedReplies[food.id] = [];

      const available = food.responses.filter(
        r => !usedReplies[food.id].includes(r)
      );

      if (available.length === 0) {
        usedReplies[food.id] = [];
        return food.responses[0];
      }

      const reply =
        available[Math.floor(Math.random() * available.length)];

      usedReplies[food.id].push(reply);
      return reply;
    }
  }

  // 2️⃣ UNSUPPORTED FOOD (food-like but not available)
  if (unsupportedFoods.some(food => msg.includes(food))) {
    return {
      text:
        "Sorry for the inconvenience, but I don’t have recipes for that ingredient yet. You can try asking about rice, paneer, noodles, pizza, or chicken.",
      images: []
    };
  }

  // 3️⃣ NOT FOOD AT ALL
  return {
    text:
      "Sorry, I can only help with food and recipe-related topics right now.",
    images: []
  };
}



/* ======================================================
   BLOCK 4: MAIN BACKUP AI COMPONENT
   - Controls open/close
   - Manages messages and input
====================================================== */

export default function BackupAI() {
  /* ---------------- STATE ---------------- */

  const [open, setOpen] = useState(false);      // Toggle chat
  const [messages, setMessages] = useState([]); // Chat history
  const [input, setInput] = useState("");       // Input field
  const [previewImage, setPreviewImage] = useState(null);

  /* ---------------- REFS ---------------- */

  const messagesRef = useRef(null);

  /* ---------------- EFFECTS ---------------- */

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop =
        messagesRef.current.scrollHeight;
    }
  }, [messages]);

  /* ======================================================
     BLOCK 5: SEND MESSAGE HANDLER
     - Handles user message
     - Calls backup AI logic
     - Pushes AI response to chat
  ====================================================== */

 /* ======================================================
   BLOCK 5: SEND MESSAGE HANDLER (WITH TYPING FEEL)
====================================================== */

const [typing, setTyping] = useState(false);

const sendMessage = () => {
  if (!input.trim() || typing) return;

  const userMsg = {
    sender: "user",
    text: input,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  setMessages(prev => [...prev, userMsg]);
  setInput("");
  setTyping(true);

  setTimeout(() => {
    const ai = getBackupAIResponse(userMsg.text);

    setMessages(prev => [
      ...prev,
      {
        sender: "ai",
        text: ai.text,
        images: ai.images,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      }
    ]);

    setTyping(false);
  }, 2200); // 2–3 sec delay feel
};


  /* ======================================================
     BLOCK 6: UI
     - Info section + toggle button
     - Chat UI (same as Groq design)
  ====================================================== */

  return (
    <div className="w-full flex flex-col items-center mt-16 gap-6">

      {/* INFO + TOGGLE BUTTON */}
      <div className="text-center max-w-md px-4">
        <p className="text-sm text-gray-500 mb-4">
          If the AI is struggling to respond, you can use the backup AI instead.
        </p>

        <button
          onClick={() => setOpen(prev => !prev)}
          className="px-7 py-3 rounded-xl bg-orange-500 text-white font-medium hover:scale-105 transition"
        >
          {open ? "Close Backup AI" : "Use Backup AI"}
        </button>
      </div>

      {/* CHAT CONTAINER (TOGGLED) */}
      {open && (
        <div className="min-h-screen bg-orange-200/30 rounded-2xl flex justify-center items-center px-2 bg-[url('/chatbg.png')] bg-repeat w-full h-screen bg-size-[500px_400px] bg-center">
          <div className="w-full md:w-230 h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">

            {/* HEADER */}
            <div className="p-4 border-b flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                🍳
              </div>
              <div>
                <p className="font-semibold">Backup AI</p>
                <p className="text-xs text-gray-500">FoodHub Assistant</p>
              </div>
              {previewImage && (
  <div
    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    onClick={() => setPreviewImage(null)}
  >
    <div
      className="relative bg-white rounded-2xl p-4 max-w-lg w-[50%]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={() => setPreviewImage(null)}
        className="absolute -top-3 -right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center"
      >
        ✕
      </button>

      {/* Image */}
      <img
        src={previewImage}
        alt="Preview"
        className="w-full h-auto rounded-xl object-contain"
      />
    </div>
  </div>
)}

            </div>

            {/* DATE */}
            <div className="text-center text-xs text-gray-500 my-2">
              {new Date().toDateString()}
            </div>

            {/* MESSAGES */}
            <div
              ref={messagesRef}
              className="flex-1 px-4 space-y-3 overflow-y-auto hide-scrollbar"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >

                  {msg.sender === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm">
                      🍳
                    </div>
                  )}

                  <div
                    className={`max-w-[40%] px-4 py-2 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-orange-500/90 text-white rounded-br-md"
                        : "bg-gray-200/40 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    <p dangerouslySetInnerHTML={{ __html: msg.text }} /> {/* use this instead of <p>{msg.text}</p> so we can use css on text responnses too */}


                    {/* IMAGE response */}
                    {msg.images && msg.images.length > 0 && (
                        <div className="flex gap-3 mt-3">
                            {msg.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt="Food"
                                onClick={() => setPreviewImage(img)}
                                className="w-36 h-28 rounded-xl object-cover border cursor-pointer hover:scale-105 transition"
                                loading="lazy"
                            />
                            ))}
                        </div>
                        )}



                    <p className="text-[10px] mt-1 opacity-70 text-right">
                      {msg.time}
                    </p>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm">
                      👤
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex items-end gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm">
                    🍳
                </div>

                <div className="bg-gray-200 text-gray-500 px-4 py-2 rounded-2xl text-sm italic">
                    AI is typing...
                </div>
                </div>
                )}
            </div>

            {/* INPUT */}
            <div className="p-4 border-t flex gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Type something here..."
                className="flex-1 px-4 py-2 rounded-full border text-sm focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="w-11 h-11 rounded-full bg-orange-500/90 text-white flex items-center justify-center"
              >
                ➤
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
