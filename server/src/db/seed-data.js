const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const products = [
  ['Nova 550W Mono PERC Panel', 'Solar Panels', 17999, 4.8, 24, '550 W', '21.3%', '25 years', 'High-output monocrystalline panel for homes and businesses.'],
  ['Nova 450W TOPCon Panel', 'Solar Panels', 15999, 4.9, 31, '450 W', '22.5%', '25 years', 'Next-generation N-type cell technology with excellent low-light performance.'],
  ['Nova 400W Compact Panel', 'Solar Panels', 12999, 4.6, 18, '400 W', '20.8%', '25 years', 'Space-conscious panel suited to residential rooftops.'],
  ['Nova 600W Bifacial Panel', 'Solar Panels', 22999, 4.8, 12, '600 W', '22.1%', '25 years', 'Bifacial glass-glass module captures reflected light.'],
  ['Nova 3kW Grid-Tie Inverter', 'Inverters', 38999, 4.7, 11, '3 kW', '97.6%', '8 years', 'Single-phase inverter with app monitoring and grid protection.'],
  ['Nova 5kW Hybrid Inverter', 'Inverters', 72999, 4.9, 8, '5 kW', '98.0%', '10 years', 'Hybrid inverter prepared for battery backup and smart energy management.'],
  ['Nova 10kW Three-Phase Inverter', 'Inverters', 119999, 4.6, 5, '10 kW', '98.2%', '10 years', 'Three-phase conversion for commercial rooftop systems.'],
  ['Nova 2kW Microinverter', 'Inverters', 24999, 4.5, 14, '2 kW', '96.8%', '10 years', 'Module-level monitoring for complex roofs and partial shade.'],
  ['Nova 5.12kWh LiFePO4 Battery', 'Batteries', 124999, 4.9, 7, '5.12 kWh', '95% DoD', '10 years', 'Long-life lithium iron phosphate storage with integrated BMS.'],
  ['Nova 10kWh Home Battery', 'Batteries', 219999, 4.8, 4, '10 kWh', '90% DoD', '10 years', 'Modular storage for overnight use and backup.'],
  ['Nova 150Ah Solar Battery', 'Batteries', 28999, 4.5, 16, '150 Ah', '—', '5 years', 'Tubular lead-acid battery for compatible off-grid systems.'],
  ['Nova 2.4kWh Backup Battery', 'Batteries', 69999, 4.6, 9, '2.4 kWh', '90% DoD', '7 years', 'Compact wall-mount energy storage for essential loads.'],
  ['Aluminium Roof Mount Kit (4 panels)', 'Mounting & Accessories', 8999, 4.7, 36, '4 panels', '—', '10 years', 'Corrosion-resistant mounting rails and roof attachment hardware.'],
  ['Solar DC Cable 6mm (20m)', 'Mounting & Accessories', 2499, 4.6, 42, '20 m', '1500 V DC', '5 years', 'UV-resistant, double-insulated solar cable.'],
  ['Nova 6-String DC Combiner', 'Mounting & Accessories', 5999, 4.4, 20, '6 strings', 'IP65', '5 years', 'Weatherproof combiner with protection and isolation.'],
  ['Solar Panel Cleaning Kit', 'Mounting & Accessories', 3499, 4.5, 28, '5 m pole', '—', '2 years', 'Soft-brush cleaning kit designed for rooftop solar modules.'],
];
const projects = [
  ['Sunrise Family Home', 'Pune, Maharashtra', 5, 'Residential', 'photo-1600585154340-be6161a56a0c'],
  ['GreenLeaf Business Park', 'Bengaluru, Karnataka', 48, 'Commercial', 'photo-1486406146926-c627a92ad1ab'],
  ['Harvest Agro Works', 'Nashik, Maharashtra', 120, 'Industrial', 'photo-1497366754035-f200968a6e72'],
  ['Seaside Villa', 'Kochi, Kerala', 8, 'Residential', 'photo-1600607687939-ce8a6c25118c'],
  ['Lotus Textile Mill', 'Surat, Gujarat', 250, 'Industrial', 'photo-1497366811353-6870744d04b2'],
  ['Oakwood Apartments', 'Hyderabad, Telangana', 36, 'Commercial', 'photo-1460317442991-0ec209397118'],
  ['Maple School Campus', 'Jaipur, Rajasthan', 25, 'Commercial', 'photo-1580582932707-520aed937b7b'],
  ['Hillview Retreat', 'Shimla, Himachal Pradesh', 12, 'Residential', 'photo-1449158743715-0a90ebb6d2d8'],
];
const blog = [
  ['how-solar-panels-work', 'How Solar Panels Turn Sunlight Into Electricity', 'A simple guide to the photovoltaic effect, inverters and the power flowing through your home.', 'The photovoltaic cells in a solar panel absorb photons from sunlight. This energy frees electrons, creating direct current (DC). An inverter converts DC into alternating current (AC), which powers your home. A grid-connected system can export surplus electricity, subject to your local utility rules. System output depends on panel orientation, shade, weather and equipment. A professional site assessment helps estimate generation for your roof.', 'Solar basics', 'photo-1509391366360-2e959784a276', '2026-08-18', '6 min read'],
  ['net-metering-explained', 'Net Metering Explained for Homeowners', 'Understand how imports, exports and your electricity bill work together.', 'Net metering is a billing arrangement that tracks electricity your solar system sends to the grid against electricity you draw from it. The exact credit, settlement period, eligibility and meter process depend on your distribution company and state regulations. Ask your utility for its current rules before choosing a system. Our team can help with the application process, but final approval rests with the utility.', 'Savings', 'photo-1473341304170-971dccb5ac1e', '2026-08-10', '5 min read'],
  ['choosing-panel-types', 'Monocrystalline, TOPCon and Bifacial Panels', 'Compare common panel technologies and learn which trade-offs matter most.', 'Monocrystalline panels are widely used for their strong efficiency and broad availability. TOPCon is a newer cell architecture that can offer improved efficiency and performance in some conditions. Bifacial modules collect light from both sides, making installation surface and mounting height important. Compare tested module specifications, warranty terms and installer support—not just peak wattage. Your usable roof area and shading often determine the best fit.', 'Products', 'photo-1508514177221-188b1cf16e9d', '2026-08-02', '7 min read'],
  ['home-battery-storage', 'Is Home Battery Storage Right for You?', 'Explore backup, self-consumption and battery sizing considerations.', 'A battery can provide backup during outages when paired with a suitably configured inverter, and store some daytime solar energy for later use. Sizing depends on the appliances you want to run, their power draw, backup duration and local outage patterns. Battery chemistry, usable capacity, inverter compatibility, installation and warranties affect total cost. A battery does not automatically make a grid-tied system work during a blackout; equipment must be designed for backup operation.', 'Storage', 'photo-1473341304170-971dccb5ac1e', '2026-07-24', '6 min read'],
  ['solar-maintenance-guide', 'Solar Panel Maintenance: A Practical Guide', 'Keep your system performing with safe, sensible maintenance habits.', 'Solar systems are generally low-maintenance, but periodic visual checks can catch issues early. Keep panels clear of heavy dust and debris using safe methods recommended by your installer. Never climb onto a roof or spray electrical equipment. Review inverter monitoring for unusual drops and contact a qualified technician for electrical concerns. Cleaning frequency depends on local dust, rainfall, tilt and site conditions; avoid abrasive tools that can damage glass or coatings.', 'Maintenance', 'photo-1509391366360-2e959784a276', '2026-07-16', '4 min read'],
  ['solar-incentives-overview', 'Solar Subsidies and Incentives: What to Check', 'A general checklist for researching current regional programs.', 'Solar incentives may be offered through national or state programs, utilities or financing partners, and eligibility can depend on system type, installer registration and application timing. Program amounts and rules change. Check current official government and utility sources before making a purchase, and confirm whether pre-approval is required. This overview is general information, not a promise of eligibility or financial advice. A site survey and current local rules are essential for an accurate proposal.', 'Guides', 'photo-1497435334941-8c899ee9e8e9', '2026-07-08', '5 min read'],
];
const faqs = [
  ['Getting started', 'How do I know what system size I need?', 'Sizing depends on your electricity use, roof space, shading and local utility rules. Share a recent bill and request a site survey for a tailored design.'],
  ['Getting started', 'How does a solar installation work?', 'A typical process includes consultation, site survey, system design, approvals, installation, inspection and utility commissioning. Timing varies by site and local approvals.'],
  ['Getting started', 'How long does installation take?', 'Physical rooftop work often takes a few days, while approvals and utility commissioning can take longer depending on the location and project.'],
  ['Getting started', 'Can solar work on my roof?', 'Most structurally sound roofs with suitable sun exposure can be assessed. Roof condition, orientation, shade and available area matter.'],
  ['Costs & savings', 'How much does a solar system cost?', 'Cost depends on system size, equipment, roof complexity, batteries and local requirements. Use our calculator for an estimate, then request a site-specific quote.'],
  ['Costs & savings', 'How much can I save with solar?', 'Savings depend on generation, self-consumption, your tariff and export-credit rules. Estimates are not guarantees; actual results vary.'],
  ['Costs & savings', 'Are subsidies available?', 'Programs vary by region and change over time. Verify current eligibility and terms with official government or utility sources.'],
  ['Costs & savings', 'What is net metering?', 'It measures energy exported to and imported from the grid. Billing and credit rules are set by the local utility and regulator.'],
  ['Equipment', 'What is the difference between on-grid and hybrid?', 'On-grid systems work with the utility and usually shut down during outages for safety. Hybrid systems can add compatible batteries and backup capability.'],
  ['Equipment', 'Do I need a battery?', 'A battery is useful for backup or shifting solar energy to later hours, but may not be cost-effective for every home.'],
  ['Equipment', 'How long do solar panels last?', 'Many modules carry performance warranties around 25 years; actual service life and output depend on product terms, environment and maintenance.'],
  ['Equipment', 'Can panels power my home during an outage?', 'Standard grid-tied systems typically shut off during a grid outage. Backup requires compatible equipment, correct design and utility-compliant installation.'],
  ['Care & safety', 'How often should panels be cleaned?', 'It depends on dust, rain and site conditions. Follow your installer guidance and use safe cleaning methods; never climb onto an unsafe roof.'],
  ['Care & safety', 'Do panels work on cloudy days?', 'They can still generate electricity in diffuse light, but output is lower than in direct sun.'],
  ['Care & safety', 'What maintenance does an inverter need?', 'Check its monitoring and follow the manufacturer’s instructions. Have a qualified professional inspect faults or electrical equipment.'],
  ['Care & safety', 'Can I install solar myself?', 'Rooftop solar involves electrical, structural and utility safety requirements. Use qualified installers and approved equipment.'],
];
const testimonials = [
  ['Ananya Mehta', 'Pune', 'The team explained every step clearly and helped us understand our monthly generation.', 5, '5 kW home system'],
  ['Rohit Nair', 'Bengaluru', 'Professional installation and a neat finish. Monitoring makes it easy to follow performance.', 5, '8 kW hybrid system'],
  ['Priya Shah', 'Ahmedabad', 'Our business received a clear design and practical guidance on utility approvals.', 5, '30 kW commercial'],
  ['Vikram Rao', 'Hyderabad', 'The site assessment helped us choose the right equipment for our roof and budget.', 5, '6 kW home system'],
  ['Kavita Desai', 'Surat', 'Responsive service after commissioning and useful advice on keeping panels clean.', 5, '10 kW home system'],
];

export function seedDatabase(db) {
  const putProduct = db.prepare(`INSERT OR IGNORE INTO products
    (id,name,category,description,price,rating,stock,image,wattage,efficiency,warranty,specs)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`);
  products.forEach((p, i) => putProduct.run(i + 1, p[0], p[1], p[8], p[2], p[3], p[4], photo(['photo-1509391366360-2e959784a276','photo-1508514177221-188b1cf16e9d'][i % 2]), p[5], p[6], p[7], JSON.stringify({ Output: p[5], Efficiency: p[6], Warranty: p[7], Certification: 'IEC certified', 'Operating temperature': '-40°C to 85°C' })));
  const putProject = db.prepare('INSERT OR IGNORE INTO projects VALUES (?,?,?,?,?,?,?)');
  projects.forEach((p, i) => putProject.run(i + 1, p[0], p[1], p[2], p[3], photo(p[4]), `${p[0]} features a thoughtfully designed solar installation sized for the property and its energy needs.`));
  const putBlog = db.prepare('INSERT OR IGNORE INTO blog VALUES (?,?,?,?,?,?,?,?,?)');
  blog.forEach((p, i) => putBlog.run(i + 1, p[0], p[1], p[2], p[3], p[4], photo(p[5]), p[6], p[7]));
  const putFaq = db.prepare('INSERT OR IGNORE INTO faqs VALUES (?,?,?,?)');
  faqs.forEach((p, i) => putFaq.run(i + 1, ...p));
  const putTestimonial = db.prepare('INSERT OR IGNORE INTO testimonials VALUES (?,?,?,?,?,?)');
  testimonials.forEach((p, i) => putTestimonial.run(i + 1, ...p));
}
