import { useMemo, useState } from "react";
import TourCard from "./Tourcard";
import API_BASE_URL from "../api";

const stateTours = [
  {
    id: "andhra-pradesh",
    title: "Andhra Pradesh Heritage Coast",
    state: "Andhra Pradesh",
    region: "South India",
    capital: "Amaravati",
    price: 11999,
    duration: "6 days",
    bestTime: "October to March",
    route: "Visakhapatnam, Araku Valley, Vijayawada, Amaravati",
    description:
      "A coastal and cultural route with beaches, caves, hill valleys, temples, and riverfront heritage.",
    highlights: ["Araku Valley", "Borra Caves", "RK Beach", "Kanaka Durga Temple"],
    image: "/img/arunachal.png"
  },
  {
    id: "arunachal-pradesh",
    title: "Arunachal Eastern Himalaya",
    state: "Arunachal Pradesh",
    region: "North East India",
    capital: "Itanagar",
    price: 18999,
    duration: "7 days",
    bestTime: "March to June, October to April",
    route: "Itanagar, Ziro Valley, Tawang, Bomdila",
    description:
      "A mountain journey through monasteries, high passes, pine valleys, tribal culture, and dramatic Himalayan roads.",
    highlights: ["Tawang Monastery", "Ziro Valley", "Sela Pass", "Bomdila"],
    image: "/img/img (14).jpg"
  },
  {
    id: "assam",
    title: "Assam Wildlife and Tea Trails",
    state: "Assam",
    region: "North East India",
    capital: "Dispur",
    price: 14999,
    duration: "6 days",
    bestTime: "November to April",
    route: "Guwahati, Kaziranga, Majuli, Jorhat",
    description:
      "Tea gardens, river islands, temples, and wildlife safaris make Assam one of India's richest nature escapes.",
    highlights: ["Kaziranga Safari", "Majuli Island", "Kamakhya Temple", "Tea Estates"],
    image: "/img/img (15).jpg"
  },
  {
    id: "bihar",
    title: "Bihar Buddhist Circuit",
    state: "Bihar",
    region: "East India",
    capital: "Patna",
    price: 9999,
    duration: "5 days",
    bestTime: "October to March",
    route: "Patna, Bodh Gaya, Nalanda, Rajgir",
    description:
      "A history-rich itinerary through ancient universities, sacred Buddhist sites, forts, and old river cities.",
    highlights: ["Mahabodhi Temple", "Nalanda Ruins", "Rajgir", "Patna Museum"],
    image: "/img/img (16).jpg"
  },
  {
    id: "chhattisgarh",
    title: "Chhattisgarh Forest and Falls",
    state: "Chhattisgarh",
    region: "Central India",
    capital: "Raipur",
    price: 10999,
    duration: "5 days",
    bestTime: "October to February",
    route: "Raipur, Jagdalpur, Chitrakote, Bastar",
    description:
      "A green circuit of waterfalls, caves, craft villages, forest landscapes, and Bastar culture.",
    highlights: ["Chitrakote Falls", "Tirathgarh Falls", "Bastar Art", "Kanger Valley"],
    image: "/img/img (17).jpg"
  },
  {
    id: "goa",
    title: "Goa Beach and Latin Quarter",
    state: "Goa",
    region: "West India",
    capital: "Panaji",
    price: 12999,
    duration: "4 days",
    bestTime: "November to February",
    route: "Panaji, North Goa, South Goa, Old Goa",
    description:
      "A polished beach escape with coastal drives, Portuguese-era streets, churches, markets, and sunset dining.",
    highlights: ["Fontainhas", "Baga Beach", "Old Goa Churches", "Palolem"],
    image: "/img/img (21).jpg"
  },
  {
    id: "gujarat",
    title: "Gujarat Rann and Heritage",
    state: "Gujarat",
    region: "West India",
    capital: "Gandhinagar",
    price: 15999,
    duration: "6 days",
    bestTime: "November to February",
    route: "Ahmedabad, Kutch, Bhuj, Dwarka",
    description:
      "White salt desert, stepwells, coastal temples, craft villages, and heritage city walks in one route.",
    highlights: ["Rann of Kutch", "Adalaj Stepwell", "Dwarkadhish Temple", "Bhuj Crafts"],
    image: "/img/img (22).jpg"
  },
  {
    id: "delhi",
    title: "Delhi Heritage and City Icons",
    state: "Delhi",
    region: "North India",
    capital: "New Delhi",
    price: 10999,
    duration: "3 days",
    bestTime: "October to March",
    route: "India Gate, Humayun's Tomb, Red Fort, Chandni Chowk",
    description:
      "A capital-city escape covering Mughal heritage, food streets, modern landmarks, museums, and old Delhi markets.",
    highlights: ["India Gate", "Red Fort", "Qutub Minar", "Chandni Chowk"],
    image: "/img/img (20).jpg"
  },
  {
    id: "haryana",
    title: "Haryana Culture and Countryside",
    state: "Haryana",
    region: "North India",
    capital: "Chandigarh",
    price: 8999,
    duration: "4 days",
    bestTime: "October to March",
    route: "Kurukshetra, Pinjore, Morni Hills, Surajkund",
    description:
      "A compact northern route with mythology, gardens, craft fairs, lakes, and quiet hill edges.",
    highlights: ["Kurukshetra", "Pinjore Gardens", "Morni Hills", "Surajkund"],
    image: "/img/img (23).jpg"
  },
  {
    id: "himachal-pradesh",
    title: "Himachal Mountain Escape",
    state: "Himachal Pradesh",
    region: "North India",
    capital: "Shimla",
    price: 16999,
    duration: "6 days",
    bestTime: "March to June, December to February",
    route: "Shimla, Manali, Kullu, Solang Valley",
    description:
      "Classic mountain towns, apple valleys, snow viewpoints, pine forests, and adventure activities.",
    highlights: ["Shimla Ridge", "Solang Valley", "Kullu Valley", "Hadimba Temple"],
    image: "/img/img (24).jpg"
  },
  {
    id: "jharkhand",
    title: "Jharkhand Waterfalls Trail",
    state: "Jharkhand",
    region: "East India",
    capital: "Ranchi",
    price: 9999,
    duration: "5 days",
    bestTime: "October to March",
    route: "Ranchi, Netarhat, Betla, Deoghar",
    description:
      "Waterfalls, plateau viewpoints, forest drives, temples, and relaxed nature stays.",
    highlights: ["Hundru Falls", "Netarhat", "Betla National Park", "Baidyanath Temple"],
    image: "/img/img (26).jpg"
  },
  {
    id: "jammu-and-kashmir",
    title: "Jammu and Kashmir Valley Retreat",
    state: "Jammu and Kashmir",
    region: "North India",
    capital: "Srinagar",
    price: 19999,
    duration: "6 days",
    bestTime: "April to October",
    route: "Srinagar, Gulmarg, Pahalgam, Sonamarg",
    description:
      "A scenic valley route with lakes, meadows, mountain drives, gardens, houseboats, and classic Kashmir viewpoints.",
    highlights: ["Dal Lake", "Gulmarg", "Pahalgam", "Mughal Gardens"],
    image: "/img/jammu.jpg"
  },
  {
    id: "karnataka",
    title: "Karnataka Palaces and Coffee",
    state: "Karnataka",
    region: "South India",
    capital: "Bengaluru",
    price: 14999,
    duration: "6 days",
    bestTime: "October to March",
    route: "Bengaluru, Mysuru, Coorg, Hampi",
    description:
      "Royal palaces, coffee estates, boulder landscapes, temples, and city culture across Karnataka.",
    highlights: ["Mysore Palace", "Coorg", "Hampi", "Bengaluru"],
    image: "/img/img (27).jpg"
  },
  {
    id: "kerala",
    title: "Kerala Backwater Escape",
    state: "Kerala",
    region: "South India",
    capital: "Thiruvananthapuram",
    price: 13999,
    duration: "5 days",
    bestTime: "September to March",
    route: "Kochi, Munnar, Alleppey, Thekkady",
    description:
      "A lush route through tea hills, houseboats, spice gardens, beaches, and slow backwater mornings.",
    highlights: ["Alleppey Houseboat", "Munnar Tea Estates", "Fort Kochi", "Periyar"],
    image: "/img/img (28).jpg"
  },
  {
    id: "ladakh",
    title: "Ladakh High Pass Adventure",
    state: "Ladakh",
    region: "North India",
    capital: "Leh",
    price: 22999,
    duration: "7 days",
    bestTime: "May to September",
    route: "Leh, Nubra Valley, Pangong Lake, Khardung La",
    description:
      "A dramatic high-altitude expedition through monasteries, passes, cold deserts, alpine lakes, and stark Himalayan views.",
    highlights: ["Pangong Lake", "Nubra Valley", "Leh Palace", "Khardung La"],
    image: "/img/Ladakh 22.jpg"
  },
  {
    id: "lakshadweep",
    title: "Lakshadweep Island Lagoon Escape",
    state: "Lakshadweep",
    region: "South India",
    capital: "Kavaratti",
    price: 24999,
    duration: "5 days",
    bestTime: "October to May",
    route: "Kavaratti, Agatti, Bangaram, Kadmat",
    description:
      "An island-hopping experience with lagoons, coral beaches, boat rides, turquoise waters, and slow tropical stays.",
    highlights: ["Agatti Island", "Bangaram", "Kavaratti Lagoon", "Coral Reefs"],
    image: "/img/img (31).jpg"
  },
  {
    id: "madhya-pradesh",
    title: "Madhya Pradesh Wild Heritage",
    state: "Madhya Pradesh",
    region: "Central India",
    capital: "Bhopal",
    price: 15999,
    duration: "7 days",
    bestTime: "October to March",
    route: "Bhopal, Khajuraho, Orchha, Bandhavgarh",
    description:
      "A central India route with forts, temples, tiger reserves, lakes, and ancient sculpture.",
    highlights: ["Khajuraho", "Orchha Fort", "Bandhavgarh", "Sanchi"],
    image: "/img/img (32).jpg"
  },
  {
    id: "maharashtra",
    title: "Maharashtra Caves and Coast",
    state: "Maharashtra",
    region: "West India",
    capital: "Mumbai",
    price: 14999,
    duration: "6 days",
    bestTime: "October to February",
    route: "Mumbai, Lonavala, Ajanta, Ellora",
    description:
      "A layered itinerary of city life, hill drives, ancient rock-cut caves, forts, and coastal food.",
    highlights: ["Gateway of India", "Ajanta Caves", "Ellora Caves", "Lonavala"],
    image: "/img/maharashtra.jpg"
  },
  {
    id: "manipur",
    title: "Manipur Lakes and Living Culture",
    state: "Manipur",
    region: "North East India",
    capital: "Imphal",
    price: 16999,
    duration: "5 days",
    bestTime: "October to April",
    route: "Imphal, Loktak Lake, Moirang, Andro",
    description:
      "Floating lake landscapes, handloom villages, war history, classical dance traditions, and valley views.",
    highlights: ["Loktak Lake", "Keibul Lamjao", "Kangla Fort", "Andro Village"],
    image: "/img/img (35).jpg"
  },
  {
    id: "meghalaya",
    title: "Meghalaya Clouds and Caves",
    state: "Meghalaya",
    region: "North East India",
    capital: "Shillong",
    price: 15999,
    duration: "6 days",
    bestTime: "October to April",
    route: "Shillong, Cherrapunji, Dawki, Mawlynnong",
    description:
      "Cloud forests, living root bridges, crystal rivers, caves, waterfalls, and clean village stays.",
    highlights: ["Living Root Bridge", "Dawki River", "Nohkalikai Falls", "Mawlynnong"],
    image: "/img/img (36).jpg"
  },
  {
    id: "mizoram",
    title: "Mizoram Hill Serenity",
    state: "Mizoram",
    region: "North East India",
    capital: "Aizawl",
    price: 16999,
    duration: "5 days",
    bestTime: "October to March",
    route: "Aizawl, Reiek, Hmuifang, Tam Dil",
    description:
      "Quiet hill roads, bamboo landscapes, lake viewpoints, local markets, and soft mountain light.",
    highlights: ["Aizawl", "Reiek Peak", "Hmuifang", "Tam Dil"],
    image: "/img/img (37).jpg"
  },
  {
    id: "nagaland",
    title: "Nagaland Village and Festival Route",
    state: "Nagaland",
    region: "North East India",
    capital: "Kohima",
    price: 17999,
    duration: "6 days",
    bestTime: "October to May",
    route: "Kohima, Kisama, Khonoma, Dimapur",
    description:
      "Community villages, war memorials, hill scenery, crafts, and rich food traditions.",
    highlights: ["Kohima", "Khonoma Village", "Kisama Heritage Village", "Dzukou Valley"],
    image: "/img/img (38).jpg"
  },
  {
    id: "odisha",
    title: "Odisha Temple and Lagoon Trail",
    state: "Odisha",
    region: "East India",
    capital: "Bhubaneswar",
    price: 12999,
    duration: "5 days",
    bestTime: "October to March",
    route: "Bhubaneswar, Puri, Konark, Chilika",
    description:
      "Temple architecture, beaches, craft villages, lake birding, and coastal food experiences.",
    highlights: ["Konark Sun Temple", "Puri Beach", "Chilika Lake", "Lingaraj Temple"],
    image: "/img/img (1).jpg"
  },
  {
    id: "punjab",
    title: "Punjab Heritage and Food Trail",
    state: "Punjab",
    region: "North India",
    capital: "Chandigarh",
    price: 10999,
    duration: "4 days",
    bestTime: "October to March",
    route: "Amritsar, Patiala, Anandpur Sahib, Chandigarh",
    description:
      "Golden temples, border ceremonies, grand food culture, historic towns, and warm countryside stays.",
    highlights: ["Golden Temple", "Wagah Border", "Patiala", "Anandpur Sahib"],
    image: "/img/img (4).jpg"
  },
  {
    id: "rajasthan",
    title: "Rajasthan Desert Royalty",
    state: "Rajasthan",
    region: "North West India",
    capital: "Jaipur",
    price: 18999,
    duration: "7 days",
    bestTime: "October to March",
    route: "Jaipur, Jodhpur, Jaisalmer, Udaipur",
    description:
      "Palaces, forts, desert camps, blue city lanes, lake views, markets, and royal dining.",
    highlights: ["Hawa Mahal", "Mehrangarh Fort", "Jaisalmer Dunes", "Lake Pichola"],
    image: "/img/img (5).jpg"
  },
  {
    id: "sikkim",
    title: "Sikkim Alpine Monasteries",
    state: "Sikkim",
    region: "North East India",
    capital: "Gangtok",
    price: 17999,
    duration: "6 days",
    bestTime: "March to June, October to December",
    route: "Gangtok, Tsomgo Lake, Pelling, Ravangla",
    description:
      "Snow views, Buddhist monasteries, alpine lakes, tidy hill towns, and peaceful valley roads.",
    highlights: ["Tsomgo Lake", "Rumtek Monastery", "Pelling", "Ravangla Buddha Park"],
    image: "/img/img (6).jpg"
  },
  {
    id: "tamil-nadu",
    title: "Tamil Nadu Temple Coast",
    state: "Tamil Nadu",
    region: "South India",
    capital: "Chennai",
    price: 13999,
    duration: "6 days",
    bestTime: "November to February",
    route: "Chennai, Mahabalipuram, Madurai, Rameswaram",
    description:
      "Classical temples, coastal heritage, Dravidian architecture, beaches, markets, and food trails.",
    highlights: ["Meenakshi Temple", "Mahabalipuram", "Rameswaram", "Marina Beach"],
    image: "/img/img (9).jpg"
  },
  {
    id: "telangana",
    title: "Telangana Forts and Flavours",
    state: "Telangana",
    region: "South India",
    capital: "Hyderabad",
    price: 11999,
    duration: "4 days",
    bestTime: "October to February",
    route: "Hyderabad, Warangal, Ramoji Film City",
    description:
      "A city-forward route with forts, old bazaars, palaces, lake views, and iconic local cuisine.",
    highlights: ["Charminar", "Golconda Fort", "Warangal Fort", "Ramoji Film City"],
    image: "/img/img (9).jpg"
  },
  {
    id: "tripura",
    title: "Tripura Palaces and Lakes",
    state: "Tripura",
    region: "North East India",
    capital: "Agartala",
    price: 14999,
    duration: "5 days",
    bestTime: "October to March",
    route: "Agartala, Neermahal, Unakoti, Jampui Hills",
    description:
      "Royal palaces, lake architecture, rock carvings, hill villages, and gentle forest roads.",
    highlights: ["Ujjayanta Palace", "Neermahal", "Unakoti", "Jampui Hills"],
    image: "/img/img (10).jpg"
  },
  {
    id: "uttar-pradesh",
    title: "Uttar Pradesh Sacred Heritage",
    state: "Uttar Pradesh",
    region: "North India",
    capital: "Lucknow",
    price: 12999,
    duration: "6 days",
    bestTime: "October to March",
    route: "Agra, Varanasi, Lucknow, Prayagraj",
    description:
      "Iconic monuments, sacred ghats, Nawabi architecture, street food, and living heritage.",
    highlights: ["Taj Mahal", "Varanasi Ghats", "Bara Imambara", "Sarnath"],
    image: "/img/img (7).jpg"
  },
  {
    id: "uttarakhand",
    title: "Uttarakhand Himalayan Retreat",
    state: "Uttarakhand",
    region: "North India",
    capital: "Dehradun",
    price: 15999,
    duration: "6 days",
    bestTime: "March to June, September to November",
    route: "Rishikesh, Mussoorie, Nainital, Jim Corbett",
    description:
      "Mountain towns, yoga ghats, lakes, forest safaris, river views, and cool hill weather.",
    highlights: ["Rishikesh", "Nainital Lake", "Jim Corbett", "Mussoorie"],
    image: "/img/img (11).jpg"
  },
  {
    id: "west-bengal",
    title: "West Bengal City to Tea Hills",
    state: "West Bengal",
    region: "East India",
    capital: "Kolkata",
    price: 14999,
    duration: "6 days",
    bestTime: "October to March",
    route: "Kolkata, Darjeeling, Kalimpong, Sundarbans",
    description:
      "Colonial city culture, tea hills, toy trains, mangrove forests, river life, and literary streets.",
    highlights: ["Darjeeling", "Victoria Memorial", "Sundarbans", "Kalimpong"],
    image: "/img/img (12).jpg"
  },
];

const regionOptions = ["All regions", ...new Set(stateTours.map((tour) => tour.region))];

const getDurationDays = (duration) => {
  const parsedDays = Number.parseInt(duration, 10);
  return Number.isNaN(parsedDays) ? 1 : parsedDays;
};

const getTourItinerary = (tour) =>
  tour.route.split(", ").map((place, index) => ({
    day: index + 1,
    title: place,
    copy:
      index === 0
        ? "Arrival, local orientation, and easy evening exploration."
        : "Guided sightseeing, regional food stops, and time for photos.",
  }));

const getMapUrl = (tour) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(
    `${tour.state}, India`
  )}&z=6&output=embed`;

const getMapDirectionsUrl = (tour) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${tour.state}, India`
  )}`;

function ToursSection() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [regionFilter, setRegionFilter] = useState("All regions");
  const [sortBy, setSortBy] = useState("recommended");
  const [stayDays, setStayDays] = useState("");
  const [bookingForm, setBookingForm] = useState({
    tour: "",
    destinationTitle: "",
    destinationLocation: "",
    name: "",
    email: "",
    phone: "",
    persons: "",
    travelDate: "",
    specialRequests: "",
  });
  const [bookingMessage, setBookingMessage] = useState("");

  const filteredTours = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    const results = stateTours.filter((tour) => {
      const searchableText = [
        tour.title,
        tour.state,
        tour.region,
        tour.capital,
        tour.route,
        tour.description,
        ...tour.highlights,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = query ? searchableText.includes(query) : true;
      const matchesRegion = regionFilter === "All regions" || tour.region === regionFilter;

      return matchesSearch && matchesRegion;
    });

    return [...results].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return a.state.localeCompare(b.state);
    });
  }, [regionFilter, searchText, sortBy]);

  const activeFilterCount = [
    searchText.trim(),
    regionFilter !== "All regions",
  ].filter(Boolean).length;

  const lowestMatchPrice = 0;
  const selectedItinerary = selectedTour ? getTourItinerary(selectedTour) : [];
  const selectedTourDailyRate = selectedTour
    ? Math.round(selectedTour.price / getDurationDays(selectedTour.duration))
    : 0;
  const calculatedStayPrice =
    selectedTour && stayDays ? selectedTourDailyRate * Number(stayDays) : 0;

  const handleViewDetails = (tour) => {
    setSelectedTour(tour);
    setStayDays("");
    setBookingMessage("");
    setBookingForm((prev) => ({
      ...prev,
      tour: tour._id || "",
      destinationTitle: tour.title,
      destinationLocation: tour.state,
    }));

    window.setTimeout(() => {
      document.getElementById("tour-details")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const resetFilters = () => {
    setSearchText("");
    setRegionFilter("All regions");
    setSortBy("recommended");
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;

    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      const data = await response.json();

      if (!response.ok) {
        setBookingMessage(data.message || "Booking failed");
        return;
      }

      setBookingMessage("Booking created successfully");
      console.log("Booking response:", data);
    } catch {
      setBookingMessage("Something went wrong");
    }
  };

  return (
    <section className="catalog-section" id="tours">
      <div className="section-heading">
        <p className="section-tag">India destination catalog</p>
        <h2>Explore states and union territory tours across India.</h2>
        <p>
          Search by destination or place, filter by region, check the details,
          and then book the tour.
        </p>
      </div>

      <div className="tours-catalog">
        <div className="catalog-toolbar catalog-toolbar--advanced">
          <div>
            <h3>Find your next destination</h3>
            <p>Search by destination, capital, route, or highlight.</p>
          </div>
          <div className="catalog-search">
            <input
              className="site-input"
              type="text"
              placeholder="Search Kerala, forts, beaches, Himalaya..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="site-button" type="button">
              Search
            </button>
          </div>
        </div>

        <div className="filter-panel" aria-label="Tour filters">
          <label>
            <span>Region</span>
            <select
              className="site-input"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              {regionOptions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Sort</span>
            <select
              className="site-input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>

          <button
            className="site-button site-button--subtle"
            type="button"
            onClick={resetFilters}
            disabled={activeFilterCount === 0}
          >
            Reset
          </button>
        </div>

        <p className="catalog-summary">
          Showing {filteredTours.length} of {stateTours.length} destinations
          {lowestMatchPrice ? ` · Lowest price Rs. ${lowestMatchPrice}` : ""}.
        </p>

        <div className="catalog-results">
          <div className="catalog-results__header">
            <div>
              <h3>All Tours</h3>
              <p>Open any destination to see route, highlights, timing, and booking.</p>
            </div>
            <span>{filteredTours.length} of {stateTours.length} shown</span>
          </div>

          {filteredTours.length === 0 ? (
            <div className="empty-results">
              <h4>No tours match those filters.</h4>
              <p>Try a wider budget, another region, or remove the search text.</p>
              <button className="site-button site-button--subtle" type="button" onClick={resetFilters}>
                Reset filters
              </button>
            </div>
          ) : (
            <div className="state-tour-grid">
              {filteredTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  mapUrl={getMapDirectionsUrl(tour)}
                  onViewDetails={() => handleViewDetails(tour)}
                />
              ))}
            </div>
          )}
        </div>

        {selectedTour && (
          <section className="tour-detail-section" id="tour-details">
            <div className="tour-detail-hero">
              <div>
                <p className="section-tag">{selectedTour.region}</p>
                <h3>{selectedTour.title}</h3>
                <p>{selectedTour.description}</p>
              </div>
              <div className="tour-detail-price">
                <span>Stay-based pricing</span>
                <strong>Rs. {selectedTourDailyRate}/day</strong>
                <small>Enter your stay days below to calculate total price.</small>
              </div>
            </div>

            <div className="tour-detail-grid">
              <article>
                <span>State</span>
                <strong>{selectedTour.state}</strong>
              </article>
              <article>
                <span>Capital</span>
                <strong>{selectedTour.capital}</strong>
              </article>
              <article>
                <span>Duration</span>
                <strong>{selectedTour.duration}</strong>
              </article>
              <article>
                <span>Best time</span>
                <strong>{selectedTour.bestTime}</strong>
              </article>
            </div>

            <div className="tour-detail-content">
              <div>
                <h4>Suggested Route</h4>
                <p>{selectedTour.route}</p>
              </div>
              <div>
                <h4>Top Experiences</h4>
                <div className="highlight-list">
                  {selectedTour.highlights.map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="map-panel">
              <div className="map-panel__copy">
                <p className="section-tag">Map preview</p>
                <h3>{selectedTour.state} on the map</h3>
                <p>
                  Use this preview to understand the destination area before
                  booking. Open the full map for directions and nearby places.
                </p>
                <a
                  className="site-button site-button--subtle"
                  href={getMapDirectionsUrl(selectedTour)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open map
                </a>
              </div>
              <div className="map-frame">
                <iframe
                  title={`${selectedTour.state} map`}
                  src={getMapUrl(selectedTour)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="itinerary-panel">
              <div className="booking-card__header">
                <p className="section-tag">Route plan</p>
                <h3>Suggested day-by-day flow</h3>
              </div>
              <div className="itinerary-list">
                {selectedItinerary.map((item) => (
                  <article key={`${selectedTour.id}-${item.day}`}>
                    <span>Day {item.day}</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="travel-notes">
              <article>
                <h4>Included planning</h4>
                <p>Route guidance, stay suggestions, pickup coordination, and experience planning.</p>
              </article>
              <article>
                <h4>Good to know</h4>
                <p>Final pricing may change with hotel class, season, group size, and transport choice.</p>
              </article>
              <article>
                <h4>Support</h4>
                <p>Share special requests in the form and the team can customize the route.</p>
              </article>
            </div>

            <div className="detail-booking-panel" id="booking">
              <div className="booking-card__header">
                <p className="section-tag">Booking request</p>
                <h3>Book {selectedTour.state}</h3>
                <p>
                  Send your details after reviewing the state tour information.
                </p>
              </div>

              <form className="booking-form" onSubmit={handleBookingSubmit}>
                <input
                  className="site-input"
                  type="text"
                  name="destinationTitle"
                  value={bookingForm.destinationTitle}
                  readOnly
                />

                <input
                  className="site-input"
                  type="text"
                  name="destinationLocation"
                  value={bookingForm.destinationLocation}
                  readOnly
                />

                <input
                  className="site-input"
                  type="number"
                  min="1"
                  placeholder="How many days will you stay?"
                  value={stayDays}
                  onChange={(e) => setStayDays(e.target.value)}
                />

                <div className="form-message">
                  {stayDays
                    ? `Estimated total price: Rs. ${calculatedStayPrice}`
                    : "Price will be calculated after you enter your stay days."}
                </div>

                <input
                  className="site-input"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={bookingForm.name}
                  onChange={handleBookingChange}
                />

                <input
                  className="site-input"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={bookingForm.email}
                  onChange={handleBookingChange}
                />

                <input
                  className="site-input"
                  type="text"
                  name="phone"
                  placeholder="Enter your phone"
                  value={bookingForm.phone}
                  onChange={handleBookingChange}
                />

                <input
                  className="site-input"
                  type="number"
                  name="persons"
                  placeholder="Enter number of persons"
                  value={bookingForm.persons}
                  onChange={handleBookingChange}
                />

                <input
                  className="site-input"
                  type="date"
                  name="travelDate"
                  value={bookingForm.travelDate}
                  onChange={handleBookingChange}
                />

                <textarea
                  className="site-input site-input--textarea"
                  name="specialRequests"
                  placeholder="Any special requests"
                  value={bookingForm.specialRequests}
                  onChange={handleBookingChange}
                />

                <button className="site-button" type="submit">
                  Book Now
                </button>
              </form>

              {bookingMessage && <p className="form-message">{bookingMessage}</p>}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

export default ToursSection;
