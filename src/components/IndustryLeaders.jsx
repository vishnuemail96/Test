const companies = [
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Wipro",
    logo: "https://1000logos.net/wp-content/uploads/2021/05/Wipro-logo.png",
  },
  {
    name: "Zoho",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/ZOHO_logo_2023.svg/640px-ZOHO_logo_2023.svg.png",
  },
];

const IndustryLeaders = () => {
  return (
    <div className="bg-gray-300 py-16 text-center">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">
        Industry Leaders from MNCs
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center px-4">
        {companies.map((company, index) => (
          <img
            key={index}
            src={company.logo}
            alt={company.name}
            title={company.name}
            className="h-10 sm:h-12 w-auto object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default IndustryLeaders;
