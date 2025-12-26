// src/galleries.js
import homeUnloading from "./assets/photos/home-gallery-unloading-food.png";
import homeKidsShoes from "./assets/photos/home-gallery-kids-shoes.jpg";
import homeTruckSupplies from "./assets/photos/home-gallery-truck-supplies.png";
import missionTruckOutside from "./assets/photos/mission-donations-truck-outside.png";
import missionSunrisePallets from "./assets/photos/mission-sunrise-food-pallets.png";

import programsShoeTable from "./assets/photos/programs-shoe-giveaway-table.jpg";
import programsGivingShoes from "./assets/photos/programs-volunteer-giving-shoes.jpg";
import programsTents from "./assets/photos/programs-outreach-tents-supplies.png";
import programsCommunityEvent from "./assets/photos/programs-community-supplies-event.png";
import programsSortedYard from "./assets/photos/programs-sorted-donations-yard.png";
import programsTruckBoxes from "./assets/photos/programs-truck-foodbank-boxes.png";

import donateKidsShoes2 from "./assets/photos/donate-kids-shoes-2.jpg";
import donateCommunityShoes from "./assets/photos/donate-community-shoes.jpg";
import donateKidsToys from "./assets/photos/donate-kids-toys.png";
import donateWheelchairGift from "./assets/photos/donate-child-wheelchair-gift.png";
import donateSuppliesCar from "./assets/photos/donate-supplies-in-car.png";
import donateGroceriesBoxes from "./assets/photos/donate-groceries-boxes.png";
import donateGroceriesFloor from "./assets/photos/donate-groceries-supplies-floor.png";
import donateWarehousePallets from "./assets/photos/donate-warehouse-pallets.png";

export const galleries = {
  // Home page gallery (4 images)
  home: [
    { src: homeUnloading, alt: "Volunteers unloading boxes of food outside the food bank." },
    { src: homeKidsShoes, alt: "Children holding donated shoes at a community giveaway." },
    { src: homeTruckSupplies, alt: "A truck loaded with boxes and supplies for distribution." },
    { src: missionSunrisePallets, alt: "Pallets of supplies staged outdoors during early morning light." },
  ],

  // Mission page gallery (service + logistics)
  mission: [
    { src: missionTruckOutside, alt: "Donations loaded in a truck outside the Monte Sión Center building." },
    { src: missionSunrisePallets, alt: "Pallets of supplies staged outdoors during early morning light." },
    { src: programsTents, alt: "Community outreach setup with tents and organized supplies." },
    { src: homeUnloading, alt: "Volunteers unloading boxes of food outside the food bank." },
    { src: programsSortedYard, alt: "Sorted donated items staged outside for distribution." },
  ],

  // Programs page gallery (events + outreach)
  programs: [
    { src: programsShoeTable, alt: "A community shoe giveaway with donated items on tables." },
    { src: programsGivingShoes, alt: "A volunteer handing donated shoes to a child." },
    { src: programsTents, alt: "Community outreach setup with tents and organized supplies." },
    { src: programsCommunityEvent, alt: "Community members gathered around donated supplies and essentials." },
    { src: programsSortedYard, alt: "Sorted donated items staged outside for distribution." },
    { src: programsTruckBoxes, alt: "A truck loaded with food bank boxes and supplies." },
  ],

  // Donate page gallery (impact: kids + essentials)
  donate: [
    { src: donateKidsToys, alt: "Children receiving toys and donations during a community event." },
    { src: donateWheelchairGift, alt: "A child in a wheelchair holding a donated gift bag." },
    { src: donateCommunityShoes, alt: "Community members holding donated shoes during a giveaway." },
    { src: donateKidsShoes2, alt: "Children holding donated shoes and smiling for a photo." },
    { src: donateGroceriesBoxes, alt: "Stacks of grocery boxes and pantry items ready for families." },
    { src: donateGroceriesFloor, alt: "Bulk groceries and supplies organized indoors for distribution." },
    { src: donateSuppliesCar, alt: "Donations packed into a car for delivery and support." },
    { src: donateWarehousePallets, alt: "Pallets of supplies stored and staged for distribution." },
  ],
};
