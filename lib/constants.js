export const PRICE = 50000;
export const COMM = 40;
export const PLAN = { n: 'Affiliate Plan', fee: 50000, r: COMM, p: 'Affiliate Payout' };

export const INDIAN_STATES = {
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Meerut', 'Muzaffarnagar', 'Budhana', 'Khatauli', 'Purkazi', 'Shahpur', 'Gorakhpur', 'Noida', 'Ghaziabad', 'Bareilly', 'Aligarh'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Arrah', 'Begusarai'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Satna'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara'],
  'Delhi NCR': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Chhatrapati Sambhajinagar'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Hisar', 'Rohtak'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudraprayag'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  'West Bengal': ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur', 'Asansol']
};

export const DISTRICT_BLOCKS = {
  'Muzaffarnagar': ['Budhana', 'Khatauli', 'Shahpur', 'Purkazi', 'Charthawal', 'Bhopa', 'Jansath', 'Morna', 'Baghra'],
  'Budhana': ['Budhana Town', 'Kandhla Road', 'Basi Kalan', 'Kalyanpur', 'Shahpur Border'],
  'Khatauli': ['Khatauli Rural', 'Mansurpur', 'Bhopa Road', 'Ghalibpur', 'Jansath Road'],
  'Purkazi': ['Purkazi Block', 'Gordhanpur', 'Tuglakpur', 'Dhamat', 'Sherpur'],
  'Shahpur': ['Shahpur Block', 'Bassera', 'Kakda', 'Kasampur', 'Palda'],
  'Charthawal': ['Charthawal Dehat', 'Kutesra', 'Rohana Kalan', 'Thanabhawan Border'],
  'Lucknow': ['Bakshi Ka Talab', 'Chinhat', 'Gosainganj', 'Kakori', 'Mal', 'Malihabad', 'Mohanlalganj', 'Sarojini Nagar'],
  'Kanpur': ['Bilhaur', 'Chaubepur', 'Ghatampur', 'Kalyanpur', 'Sarsaul', 'Shivrajpur', 'Patara'],
  'Varanasi': ['Arajiline', 'Baragaon', 'Chiraigaon', 'Harhua', 'Kashi Vidyapeeth', 'Pindra', 'Sevapuri'],
  'Meerut': ['Daurala', 'Hastinapur', 'Jani Khurd', 'Machhra', 'Mawana', 'Parikshitgarh', 'Rajpura', 'Rohta', 'Sardhana'],
  'Agra': ['Achhnera', 'Akola', 'Bah', 'Fatehabad', 'Khandauli', 'Pinahat', 'Shamsabad', 'Barauli Ahir'],
  'Prayagraj': ['Bahria', 'Chaka', 'Dhanupur', 'Handia', 'Jasra', 'Karchhana', 'Kaurihar', 'Mau Aima', 'Phulpur', 'Pratappur', 'Soraon'],
  'Gorakhpur': ['Bansgaon', 'Barhalganj', 'Bhalluan', 'Brahmpur', 'Campierganj', 'Chargawan', 'Gola', 'Jungle Kaudia', 'Khorabar', 'Pipraich', 'Sahjanwa', 'Sardar Nagar', 'Uruwa'],
  'Noida': ['Bisrakh', 'Dankaur', 'Dadri', 'Jewar'],
  'Ghaziabad': ['Bhojpur', 'Loni', 'Muradnagar', 'Razapur'],
  'Bareilly': ['Baheri', 'Bhadpura', 'Bhojipura', 'Bithri Chainpur', 'Faridpur', 'Fatehganj Paschim', 'Fatehganj Poorv', 'Kyangarh', 'Mirganj', 'Nawabganj', 'Richha', 'Shergarh'],
  'Aligarh': ['Akrabad', 'Atrauli', 'Bijauli', 'Chandaus', 'Dhanipur', 'Gonda', 'Iglas', 'Jawan Sikandarpur', 'Khair', 'Lodha', 'Tappal'],
  'Patna': ['Danapur', 'Phulwari Sharif', 'Fatuha', 'Bakhtiyarpur', 'Bihta', 'Maner', 'Paliganj', 'Barh', 'Masaurhi'],
  'Gaya': ['Bodh Gaya', 'Dobhi', 'Fatehpur', 'Manpur', 'Sherghati', 'Tekari', 'Wazirganj'],
  'Bhopal': ['Berasia', 'Phanda Urban', 'Phanda Rural', 'Kolar'],
  'Indore': ['Indore Block', 'Mhow', 'Sanwer', 'Depalpur'],
  'Jaipur': ['Amber', 'Bassi', 'Chaksu', 'Govindgarh', 'Jamuwa Ramgarh', 'Jhotwara', 'Kotputli', 'Sanganer', 'Shahpura', 'Viratnagar'],
  'Jodhpur': ['Baori', 'Bhopalgarh', 'Bilara', 'Luni', 'Mandor', 'Osian', 'Phalodi', 'Shergarh'],
  'New Delhi': ['Central Ward', 'Connaught Place Area', 'Chanakyapuri', 'Civil Lines', 'Karol Bagh'],
  'North Delhi': ['Alipur', 'Narela', 'Model Town', 'Burari'],
  'South Delhi': ['Hauz Khas', 'Saket', 'Mehrauli', 'Greater Kailash'],
  'East Delhi': ['Gandhi Nagar', 'Preet Vihar', 'Mayur Vihar', 'Patparganj'],
  'West Delhi': ['Patel Nagar', 'Punjabi Bagh', 'Rajouri Garden', 'Janakpuri'],
  'Mumbai': ['Colaba Area', 'Dadar', 'Bandra', 'Andheri', 'Borivali', 'Kurla', 'Ghatkopar'],
  'Pune': ['Haveli', 'Mulshi', 'Baramati', 'Shirur', 'Khed', 'Maval', 'Daund'],
  'Gurugram': ['Badshahpur', 'Farrukhnagar', 'Pataudi', 'Sohna', 'Wazirabad'],
  'Faridabad': ['Ballabgarh', 'Faridabad Urban', 'Tigaon'],
  'Ludhiana': ['Dehlon', 'Doraha', 'Jagraon', 'Khanna', 'Ludhiana-1', 'Ludhiana-2', 'Machhiwara', 'Pakhowal', 'Raikot', 'Samrala', 'Sidhwan Bet'],
  'Amritsar': ['Ajnala', 'Attari', 'Chogawan', 'Harsha Chhina', 'Jandiala', 'Majitha', 'Raya', 'Tarsikka', 'Verka'],
  'Dehradun': ['Chakrata', 'Doiwala', 'Kalsi', 'Raipur', 'Sahaspur', 'Vikasnagar'],
  'Haridwar': ['Bahadrabad', 'Bhagwanpur', 'Khanpur', 'Laksar', 'Narsan', 'Roorkee Block'],
  'Ranchi': ['Angara', 'Bero', 'Bundu', 'Burmu', 'Chanho', 'Kanke', 'Lapung', 'Mandar', 'Namkum', 'Ormanjhi', 'Rahe', 'Ratu', 'Silli', 'Sonahatu', 'Tamar'],
  'Ahmedabad': ['Daskroi', 'Sanand', 'Dholka', 'Bavla', 'Viramgam', 'Mandal', 'Detroj'],
  'Surat': ['Choryasi', 'Olpad', 'Kamrej', 'Bardoli', 'Mahuva', 'Mandvi', 'Mangrol', 'Umarpada'],
  'Kolkata': ['Bhowanipore', 'Jadavpur', 'Behala', 'Salt Lake', 'New Town', 'Dum Dum', 'Shyambazar'],
};

export const getBlocksForCity = (city) => {
  if (!city) return [];
  return DISTRICT_BLOCKS[city] || [
    `${city} Central Block`,
    `${city} North Block`,
    `${city} South Block`,
    `${city} Rural Block`,
    `${city} Urban Block`
  ];
};

export const AREAS = Object.values(INDIAN_STATES).flat();
export const R = (n) => '₹' + Number(n).toLocaleString('en-IN');

