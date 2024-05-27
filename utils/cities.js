let cities = [
  {
    city: 'Nicobar',
    state: 'AndamanandNicobar',
  },
  {
    city: 'North and Middle Andaman',
    state: 'AndamanandNicobar',
  },
  {
    city: 'South Andaman',
    state: 'AndamanandNicobar',
  },
  {
    city: 'Anantapur',
    state: 'AndhraPradesh',
  },
  {
    city: 'Chittoor',
    state: 'AndhraPradesh',
  },
  {
    city: 'East Godavari',
    state: 'AndhraPradesh',
  },
  {
    city: 'Guntur',
    state: 'AndhraPradesh',
  },
  {
    city: 'Dr. Y.S.Rajasekhara Reddy',
    state: 'AndhraPradesh',
  },
  {
    city: 'Krishna',
    state: 'AndhraPradesh',
  },
  {
    city: 'Kurnool',
    state: 'AndhraPradesh',
  },
  {
    city: 'Pottisriramulu Nellore',
    state: 'AndhraPradesh',
  },
  {
    city: 'Prakasam',
    state: 'AndhraPradesh',
  },
  {
    city: 'Srikakulam',
    state: 'AndhraPradesh',
  },
  {
    city: 'Visakhapatnam',
    state: 'AndhraPradesh',
  },
  {
    city: 'Vizianagaram',
    state: 'AndhraPradesh',
  },
  {
    city: 'West Godavari',
    state: 'AndhraPradesh',
  },
  {
    city: 'Tirap',
    state: 'ArunachalPradesh',
  },
  {
    city: 'West Kameng',
    state: 'ArunachalPradesh',
  },
  {
    city: 'East Kameng',
    state: 'ArunachalPradesh',
  },
  {
    city: 'East Siang',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Lower Subansiri',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Upper Subansiri',
    state: 'ArunachalPradesh',
  },
  {
    city: 'West Siang',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Lohit',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Tawang',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Changlang',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Papum Pare',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Upper Siang',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Lower Dibang Valley',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Dibang Valley',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Kurung Kumey',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Anjaw',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Longding',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Namsai',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Kra Daadi',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Siang',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Lower Siang',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Kamle',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Shi-Yomi',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Lepa-Rada',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Pakke-Kessang',
    state: 'ArunachalPradesh',
  },
  {
    city: 'Baksa',
    state: 'Assam',
  },
  {
    city: 'Barpeta',
    state: 'Assam',
  },
  {
    city: 'Biswanath',
    state: 'Assam',
  },
  {
    city: 'Bongaigaon',
    state: 'Assam',
  },
  {
    city: 'Cachar',
    state: 'Assam',
  },
  {
    city: 'Charaideo',
    state: 'Assam',
  },
  {
    city: 'Chirang',
    state: 'Assam',
  },
  {
    city: 'Darrang',
    state: 'Assam',
  },
  {
    city: 'Dhemaji',
    state: 'Assam',
  },
  {
    city: 'Dhubri',
    state: 'Assam',
  },
  {
    city: 'Dibrugarh',
    state: 'Assam',
  },
  {
    city: 'Dima Hasao',
    state: 'Assam',
  },
  {
    city: 'Goalpara',
    state: 'Assam',
  },
  {
    city: 'Golaghat',
    state: 'Assam',
  },
  {
    city: 'Hailakandi',
    state: 'Assam',
  },
  {
    city: 'Hojai',
    state: 'Assam',
  },
  {
    city: 'Jorhat',
    state: 'Assam',
  },
  {
    city: 'Kamrup Metropolitan',
    state: 'Assam',
  },
  {
    city: 'Kamrup',
    state: 'Assam',
  },
  {
    city: 'Karbi Anglong',
    state: 'Assam',
  },
  {
    city: 'Karimganj',
    state: 'Assam',
  },
  {
    city: 'Kokrajhar',
    state: 'Assam',
  },
  {
    city: 'Lakhimpur',
    state: 'Assam',
  },
  {
    city: 'Majuli',
    state: 'Assam',
  },
  {
    city: 'Morigaon',
    state: 'Assam',
  },
  {
    city: 'Nagaon',
    state: 'Assam',
  },
  {
    city: 'Nalbari',
    state: 'Assam',
  },
  {
    city: 'Sivasagar',
    state: 'Assam',
  },
  {
    city: 'Sonitpur',
    state: 'Assam',
  },
  {
    city: 'South Salmara-Mankachar',
    state: 'Assam',
  },
  {
    city: 'Tinsukia',
    state: 'Assam',
  },
  {
    city: 'Udalguri',
    state: 'Assam',
  },
  {
    city: 'West Karbi Anglong',
    state: 'Assam',
  },
  {
    city: 'Araria',
    state: 'Bihar',
  },
  {
    city: 'Arwal',
    state: 'Bihar',
  },
  {
    city: 'Aurangabad',
    state: 'Bihar',
  },
  {
    city: 'Banka',
    state: 'Bihar',
  },
  {
    city: 'Begusarai',
    state: 'Bihar',
  },
  {
    city: 'Bhagalpur',
    state: 'Bihar',
  },
  {
    city: 'Bhojpur',
    state: 'Bihar',
  },
  {
    city: 'Buxar',
    state: 'Bihar',
  },
  {
    city: 'Darbhanga',
    state: 'Bihar',
  },
  {
    city: 'East Champaran',
    state: 'Bihar',
  },
  {
    city: 'Gaya',
    state: 'Bihar',
  },
  {
    city: 'Gopalganj',
    state: 'Bihar',
  },
  {
    city: 'Jamui',
    state: 'Bihar',
  },
  {
    city: 'Jehanabad',
    state: 'Bihar',
  },
  {
    city: 'Khagaria',
    state: 'Bihar',
  },
  {
    city: 'Kishanganj',
    state: 'Bihar',
  },
  {
    city: 'Kaimur',
    state: 'Bihar',
  },
  {
    city: 'Katihar',
    state: 'Bihar',
  },
  {
    city: 'Lakhisarai',
    state: 'Bihar',
  },
  {
    city: 'Madhubani',
    state: 'Bihar',
  },
  {
    city: 'Munger',
    state: 'Bihar',
  },
  {
    city: 'Madhepura',
    state: 'Bihar',
  },
  {
    city: 'Muzaffarpur',
    state: 'Bihar',
  },
  {
    city: 'Nalanda',
    state: 'Bihar',
  },
  {
    city: 'Nawada',
    state: 'Bihar',
  },
  {
    city: 'Patna',
    state: 'Bihar',
  },
  {
    city: 'Purnia',
    state: 'Bihar',
  },
  {
    city: 'Rohtas',
    state: 'Bihar',
  },
  {
    city: 'Saharsa',
    state: 'Bihar',
  },
  {
    city: 'Samastipur',
    state: 'Bihar',
  },
  {
    city: 'Sheohar',
    state: 'Bihar',
  },
  {
    city: 'Sheikhpura',
    state: 'Bihar',
  },
  {
    city: 'Saran',
    state: 'Bihar',
  },
  {
    city: 'Sitamarhi',
    state: 'Bihar',
  },
  {
    city: 'Supaul',
    state: 'Bihar',
  },
  {
    city: 'Siwan',
    state: 'Bihar',
  },
  {
    city: 'Vaishali',
    state: 'Bihar',
  },
  {
    city: 'West Champaran',
    state: 'Bihar',
  },
  {
    city: 'Chandigarh',
    state: 'Chandigarh',
  },
  {
    city: 'Balod',
    state: 'Chhattisgarh',
  },
  {
    city: 'Baloda Bazar',
    state: 'Chhattisgarh',
  },
  {
    city: 'Balrampur',
    state: 'Chhattisgarh',
  },
  {
    city: 'Bastar',
    state: 'Chhattisgarh',
  },
  {
    city: 'Bemetara',
    state: 'Chhattisgarh',
  },
  {
    city: 'Bijapur',
    state: 'Chhattisgarh',
  },
  {
    city: 'Bilaspur',
    state: 'Chhattisgarh',
  },
  {
    city: 'Dantewada',
    state: 'Chhattisgarh',
  },
  {
    city: 'Dhamtari',
    state: 'Chhattisgarh',
  },
  {
    city: 'Durg',
    state: 'Chhattisgarh',
  },
  {
    city: 'Gariaband',
    state: 'Chhattisgarh',
  },
  {
    city: 'Gaurella-Pendra-Marwahi',
    state: 'Chhattisgarh',
  },
  {
    city: 'Janjgir-Champa',
    state: 'Chhattisgarh',
  },
  {
    city: 'Jashpur',
    state: 'Chhattisgarh',
  },
  {
    city: 'Kabirdham',
    state: 'Chhattisgarh',
  },
  {
    city: 'Kanker',
    state: 'Chhattisgarh',
  },
  {
    city: 'Kondagaon',
    state: 'Chhattisgarh',
  },
  {
    city: 'Korba',
    state: 'Chhattisgarh',
  },
  {
    city: 'Koriya',
    state: 'Chhattisgarh',
  },
  {
    city: 'Mahasamund',
    state: 'Chhattisgarh',
  },
  {
    city: 'Mungeli',
    state: 'Chhattisgarh',
  },
  {
    city: 'Narayanpur',
    state: 'Chhattisgarh',
  },
  {
    city: 'Raigarh',
    state: 'Chhattisgarh',
  },
  {
    city: 'Raipur',
    state: 'Chhattisgarh',
  },
  {
    city: 'Rajnandgaon',
    state: 'Chhattisgarh',
  },
  {
    city: 'Sukma',
    state: 'Chhattisgarh',
  },
  {
    city: 'Surajpur',
    state: 'Chhattisgarh',
  },
  {
    city: 'Surguja',
    state: 'Chhattisgarh',
  },
  {
    city: 'Manendragarh',
    state: 'Chhattisgarh',
  },
  {
    city: 'Mohla-Manpur-Chowki',
    state: 'Chhattisgarh',
  },
  {
    city: 'Sarangarh-Bilaigarh',
    state: 'Chhattisgarh',
  },
  {
    city: 'Shakti',
    state: 'Chhattisgarh',
  },
  {
    city: 'Dadra and Nagar Haveli',
    state: 'DadraandNagarHaveli',
  },
  {
    city: 'Daman',
    state: 'DamanandDiu',
  },
  {
    city: 'Diu',
    state: 'DamanandDiu',
  },
  {
    city: 'New Delhi',
    state: 'Delhi',
  },
  {
    city: 'Central Delhi',
    state: 'Delhi',
  },
  {
    city: 'East Delhi',
    state: 'Delhi',
  },
  {
    city: 'North Delhi',
    state: 'Delhi',
  },
  {
    city: 'North East Delhi',
    state: 'Delhi',
  },
  {
    city: 'North West Delhi',
    state: 'Delhi',
  },
  {
    city: 'Shahdara',
    state: 'Delhi',
  },
  {
    city: 'South Delhi',
    state: 'Delhi',
  },
  {
    city: 'South East Delhi',
    state: 'Delhi',
  },
  {
    city: 'South West Delhi',
    state: 'Delhi',
  },
  {
    city: 'West Delhi',
    state: 'Delhi',
  },
  {
    city: 'North Goa',
    state: 'Goa',
  },
  {
    city: 'South Goa',
    state: 'Goa',
  },
  {
    city: 'Ahmedabad',
    state: 'Gujarat',
  },
  {
    city: 'Amreli',
    state: 'Gujarat',
  },
  {
    city: 'Anand',
    state: 'Gujarat',
  },
  {
    city: 'Aravalli',
    state: 'Gujarat',
  },
  {
    city: 'Banaskantha',
    state: 'Gujarat',
  },
  {
    city: 'Bharuch',
    state: 'Gujarat',
  },
  {
    city: 'Bhavnagar',
    state: 'Gujarat',
  },
  {
    city: 'Botad',
    state: 'Gujarat',
  },
  {
    city: 'Chhota Udaipur',
    state: 'Gujarat',
  },
  {
    city: 'Dahod',
    state: 'Gujarat',
  },
  {
    city: 'Dang',
    state: 'Gujarat',
  },
  {
    city: 'Devbhoomi Dwarka',
    state: 'Gujarat',
  },
  {
    city: 'Gandhinagar',
    state: 'Gujarat',
  },
  {
    city: 'Gir Somnath',
    state: 'Gujarat',
  },
  {
    city: 'Jamnagar',
    state: 'Gujarat',
  },
  {
    city: 'Junagadh',
    state: 'Gujarat',
  },
  {
    city: 'Kutch',
    state: 'Gujarat',
  },
  {
    city: 'Kheda',
    state: 'Gujarat',
  },
  {
    city: 'Mahisagar',
    state: 'Gujarat',
  },
  {
    city: 'Mehsana',
    state: 'Gujarat',
  },
  {
    city: 'Morbi',
    state: 'Gujarat',
  },
  {
    city: 'Narmada',
    state: 'Gujarat',
  },
  {
    city: 'Navsari',
    state: 'Gujarat',
  },
  {
    city: 'Panchmahal',
    state: 'Gujarat',
  },
  {
    city: 'Patan',
    state: 'Gujarat',
  },
  {
    city: 'Porbandar',
    state: 'Gujarat',
  },
  {
    city: 'Rajkot',
    state: 'Gujarat',
  },
  {
    city: 'Sabarkantha',
    state: 'Gujarat',
  },
  {
    city: 'Surat',
    state: 'Gujarat',
  },
  {
    city: 'Surendranagar',
    state: 'Gujarat',
  },
  {
    city: 'Tapi',
    state: 'Gujarat',
  },
  {
    city: 'Vadodara',
    state: 'Gujarat',
  },
  {
    city: 'Valsad',
    state: 'Gujarat',
  },
  {
    city: 'Ambala',
    state: 'Haryana',
  },
  {
    city: 'Bhiwani',
    state: 'Haryana',
  },
  {
    city: 'Charkhi Dadri',
    state: 'Haryana',
  },
  {
    city: 'Faridabad',
    state: 'Haryana',
  },
  {
    city: 'Fatehabad',
    state: 'Haryana',
  },
  {
    city: 'Gurugram',
    state: 'Haryana',
  },
  {
    city: 'Hisar',
    state: 'Haryana',
  },
  {
    city: 'Jhajjar',
    state: 'Haryana',
  },
  {
    city: 'Jind',
    state: 'Haryana',
  },
  {
    city: 'Kaithal',
    state: 'Haryana',
  },
  {
    city: 'Karnal',
    state: 'Haryana',
  },
  {
    city: 'Kurukshetra',
    state: 'Haryana',
  },
  {
    city: 'Mahendragarh',
    state: 'Haryana',
  },
  {
    city: 'Nuh',
    state: 'Haryana',
  },
  {
    city: 'Palwal',
    state: 'Haryana',
  },
  {
    city: 'Panchkula',
    state: 'Haryana',
  },
  {
    city: 'Panipat',
    state: 'Haryana',
  },
  {
    city: 'Rewari',
    state: 'Haryana',
  },
  {
    city: 'Rohtak',
    state: 'Haryana',
  },
  {
    city: 'Sirsa',
    state: 'Haryana',
  },
  {
    city: 'Sonipat',
    state: 'Haryana',
  },
  {
    city: 'Yamunanagar',
    state: 'Haryana',
  },
  {
    city: 'Bilaspur',
    state: 'HimachalPradesh',
  },
  {
    city: 'Chamba',
    state: 'HimachalPradesh',
  },
  {
    city: 'Hamirpur',
    state: 'HimachalPradesh',
  },
  {
    city: 'Kangra',
    state: 'HimachalPradesh',
  },
  {
    city: 'Kinnaur',
    state: 'HimachalPradesh',
  },
  {
    city: 'Kullu',
    state: 'HimachalPradesh',
  },
  {
    city: 'Lahaul & Spiti',
    state: 'HimachalPradesh',
  },
  {
    city: 'Mandi',
    state: 'HimachalPradesh',
  },
  {
    city: 'Shimla',
    state: 'HimachalPradesh',
  },
  {
    city: 'Sirmaur',
    state: 'HimachalPradesh',
  },
  {
    city: 'Solan',
    state: 'HimachalPradesh',
  },
  {
    city: 'Una',
    state: 'HimachalPradesh',
  },
  {
    city: 'Kathua district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Jammu district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Samba district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Udhampur district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Reasi district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Rajouri district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Poonch district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Doda district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Ramban district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Kishtwar district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Anantnag district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Kulgam district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Pulwama district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Shopian district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Budgam district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Srinagar district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Ganderbal district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Bandipora district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Baramulla district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Kupwara district',
    state: 'JammuandKashmir',
  },
  {
    city: 'Bokaro',
    state: 'Jharkhand',
  },
  {
    city: 'Chatra',
    state: 'Jharkhand',
  },
  {
    city: 'Deoghar',
    state: 'Jharkhand',
  },
  {
    city: 'Dhanbad',
    state: 'Jharkhand',
  },
  {
    city: 'Dumka',
    state: 'Jharkhand',
  },
  {
    city: 'East-Singhbhum',
    state: 'Jharkhand',
  },
  {
    city: 'Garhwa',
    state: 'Jharkhand',
  },
  {
    city: 'Giridih',
    state: 'Jharkhand',
  },
  {
    city: 'Godda',
    state: 'Jharkhand',
  },
  {
    city: 'Gumla',
    state: 'Jharkhand',
  },
  {
    city: 'Hazaribagh',
    state: 'Jharkhand',
  },
  {
    city: 'Jamtara',
    state: 'Jharkhand',
  },
  {
    city: 'Khunti',
    state: 'Jharkhand',
  },
  {
    city: 'Koderma',
    state: 'Jharkhand',
  },
  {
    city: 'Latehar',
    state: 'Jharkhand',
  },
  {
    city: 'Lohardaga',
    state: 'Jharkhand',
  },
  {
    city: 'Pakur',
    state: 'Jharkhand',
  },
  {
    city: 'Palamu',
    state: 'Jharkhand',
  },
  {
    city: 'Ramgarh',
    state: 'Jharkhand',
  },
  {
    city: 'Ranchi',
    state: 'Jharkhand',
  },
  {
    city: 'Sahibganj',
    state: 'Jharkhand',
  },
  {
    city: 'Saraikela-Kharsawan',
    state: 'Jharkhand',
  },
  {
    city: 'Simdega',
    state: 'Jharkhand',
  },
  {
    city: 'West-Singhbhum',
    state: 'Jharkhand',
  },
  {
    city: 'Bagalkot',
    state: 'Karnataka',
  },
  {
    city: 'Bangalore Urban',
    state: 'Karnataka',
  },
  {
    city: 'Bangalore Rural',
    state: 'Karnataka',
  },
  {
    city: 'Belagavi',
    state: 'Karnataka',
  },
  {
    city: 'Bellary',
    state: 'Karnataka',
  },
  {
    city: 'Bidar',
    state: 'Karnataka',
  },
  {
    city: 'Vijayapura',
    state: 'Karnataka',
  },
  {
    city: 'Chamarajanagar',
    state: 'Karnataka',
  },
  {
    city: 'Chikballapur',
    state: 'Karnataka',
  },
  {
    city: 'Chikmagalur',
    state: 'Karnataka',
  },
  {
    city: 'Chitradurga',
    state: 'Karnataka',
  },
  {
    city: 'Dakshina Kannada',
    state: 'Karnataka',
  },
  {
    city: 'Davanagere',
    state: 'Karnataka',
  },
  {
    city: 'Dharwad',
    state: 'Karnataka',
  },
  {
    city: 'Gadag',
    state: 'Karnataka',
  },
  {
    city: 'Gulbarga',
    state: 'Karnataka',
  },
  {
    city: 'Hassan',
    state: 'Karnataka',
  },
  {
    city: 'Haveri',
    state: 'Karnataka',
  },
  {
    city: 'Kodagu',
    state: 'Karnataka',
  },
  {
    city: 'Kolar',
    state: 'Karnataka',
  },
  {
    city: 'Koppal',
    state: 'Karnataka',
  },
  {
    city: 'Mandya',
    state: 'Karnataka',
  },
  {
    city: 'Mysore',
    state: 'Karnataka',
  },
  {
    city: 'Raichur',
    state: 'Karnataka',
  },
  {
    city: 'Ramanagara',
    state: 'Karnataka',
  },
  {
    city: 'Shimoga',
    state: 'Karnataka',
  },
  {
    city: 'Tumkur',
    state: 'Karnataka',
  },
  {
    city: 'Udupi',
    state: 'Karnataka',
  },
  {
    city: 'Uttara Kannada',
    state: 'Karnataka',
  },
  {
    city: 'Vijayanagara',
    state: 'Karnataka',
  },
  {
    city: 'Yadgir',
    state: 'Karnataka',
  },
  {
    city: 'Alappuzha',
    state: 'Kerala',
  },
  {
    city: 'Ernakulam',
    state: 'Kerala',
  },
  {
    city: 'Idukki',
    state: 'Kerala',
  },
  {
    city: 'Kannur',
    state: 'Kerala',
  },
  {
    city: 'Kasaragod',
    state: 'Kerala',
  },
  {
    city: 'Kollam',
    state: 'Kerala',
  },
  {
    city: 'Kottayam',
    state: 'Kerala',
  },
  {
    city: 'Kozhokode',
    state: 'Kerala',
  },
  {
    city: 'Malappuram',
    state: 'Kerala',
  },
  {
    city: 'Palakkad',
    state: 'Kerala',
  },
  {
    city: 'Pathanamthitta',
    state: 'Kerala',
  },
  {
    city: 'Thiruvananthapuram',
    state: 'Kerala',
  },
  {
    city: 'Thrissur',
    state: 'Kerala',
  },
  {
    city: 'Wayanad',
    state: 'Kerala',
  },
  {
    city: 'Kargil district',
    state: 'Ladakh',
  },
  {
    city: 'Leh district',
    state: 'Ladakh',
  },
  {
    city: 'Lakshadweep',
    state: 'Lakshadweep',
  },
  {
    city: 'Alirajpur',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Anuppur',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Ashoknagar',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Balaghat',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Barwani',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Betul',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Bhind',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Bhopal',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Burhanpur',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Chhatarpur',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Chhindwara',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Damoh',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Datia',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Dewas',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Dhar',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Dindori',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Guna',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Gwalior',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Harda',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Hoshangabad',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Indore',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Jabalpur',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Jhabua',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Katni',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Khandwa',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Khargone',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Mandla',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Mandsaur',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Morena',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Narsinghpur',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Neemuch',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Panna',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Raisen',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Rajgarh',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Ratlam',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Rewa',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Sagar',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Satna',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Sehore',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Seoni',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Shahdol',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Shajapur',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Sheopur',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Shivpuri',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Sidhi',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Singroli',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Tikamgarh',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Ujjain',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Umaria',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Vidisha',
    state: 'MadhyaPradesh',
  },
  {
    city: 'Ahmednagar',
    state: 'Maharashtra',
  },
  {
    city: 'Akola',
    state: 'Maharashtra',
  },
  {
    city: 'Amravati',
    state: 'Maharashtra',
  },
  {
    city: 'Aurangabad',
    state: 'Maharashtra',
  },
  {
    city: 'Beed',
    state: 'Maharashtra',
  },
  {
    city: 'Bhandara',
    state: 'Maharashtra',
  },
  {
    city: 'Buldhana',
    state: 'Maharashtra',
  },
  {
    city: 'Chandrapur',
    state: 'Maharashtra',
  },
  {
    city: 'Dhule',
    state: 'Maharashtra',
  },
  {
    city: 'Gadchiroli',
    state: 'Maharashtra',
  },
  {
    city: 'Gondia',
    state: 'Maharashtra',
  },
  {
    city: 'Hingoli',
    state: 'Maharashtra',
  },
  {
    city: 'Jalgaon',
    state: 'Maharashtra',
  },
  {
    city: 'Jalna',
    state: 'Maharashtra',
  },
  {
    city: 'Kolhapur',
    state: 'Maharashtra',
  },
  {
    city: 'Latur',
    state: 'Maharashtra',
  },
  {
    city: 'Mumbai City',
    state: 'Maharashtra',
  },
  {
    city: 'Mumbai Suburban',
    state: 'Maharashtra',
  },
  {
    city: 'Nagpur',
    state: 'Maharashtra',
  },
  {
    city: 'Nanded',
    state: 'Maharashtra',
  },
  {
    city: 'Nandurbar',
    state: 'Maharashtra',
  },
  {
    city: 'Nashik',
    state: 'Maharashtra',
  },
  {
    city: 'Osmanabad',
    state: 'Maharashtra',
  },
  {
    city: 'Palghar',
    state: 'Maharashtra',
  },
  {
    city: 'Parbhani',
    state: 'Maharashtra',
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
  },
  {
    city: 'Raigad',
    state: 'Maharashtra',
  },
  {
    city: 'Ratnagiri',
    state: 'Maharashtra',
  },
  {
    city: 'Sangli',
    state: 'Maharashtra',
  },
  {
    city: 'Satara\t',
    state: 'Maharashtra',
  },
  {
    city: 'Sindhudurg',
    state: 'Maharashtra',
  },
  {
    city: 'Solapur',
    state: 'Maharashtra',
  },
  {
    city: 'Thane',
    state: 'Maharashtra',
  },
  {
    city: 'Wardha',
    state: 'Maharashtra',
  },
  {
    city: 'Washim',
    state: 'Maharashtra',
  },
  {
    city: 'Yavatmal',
    state: 'Maharashtra',
  },
  {
    city: 'Bishnupur',
    state: 'Manipur',
  },
  {
    city: 'Chandel',
    state: 'Manipur',
  },
  {
    city: 'Churachandpur',
    state: 'Manipur',
  },
  {
    city: 'Imphal East',
    state: 'Manipur',
  },
  {
    city: 'Imphal West',
    state: 'Manipur',
  },
  {
    city: 'Jiribam',
    state: 'Manipur',
  },
  {
    city: 'Kakching',
    state: 'Manipur',
  },
  {
    city: 'Kamjong',
    state: 'Manipur',
  },
  {
    city: 'Kangpokpi',
    state: 'Manipur',
  },
  {
    city: 'Noney',
    state: 'Manipur',
  },
  {
    city: 'Pherzawl',
    state: 'Manipur',
  },
  {
    city: 'Senapati',
    state: 'Manipur',
  },
  {
    city: 'Tamenglong',
    state: 'Manipur',
  },
  {
    city: 'Tengnoupal',
    state: 'Manipur',
  },
  {
    city: 'Thoubal',
    state: 'Manipur',
  },
  {
    city: 'Ukhrul',
    state: 'Manipur',
  },
  {
    city: 'East Khasi Hills',
    state: 'Meghalaya',
  },
  {
    city: 'West Garo Hills',
    state: 'Meghalaya',
  },
  {
    city: 'West Jaintia Hills',
    state: 'Meghalaya',
  },
  {
    city: 'West Khasi Hills',
    state: 'Meghalaya',
  },
  {
    city: 'East Garo Hills',
    state: 'Meghalaya',
  },
  {
    city: 'Ri Bhoi',
    state: 'Meghalaya',
  },
  {
    city: 'South Garo Hills',
    state: 'Meghalaya',
  },
  {
    city: 'South West Garo Hills',
    state: 'Meghalaya',
  },
  {
    city: 'South West Khasi Hills',
    state: 'Meghalaya',
  },
  {
    city: 'East Jaintia Hills',
    state: 'Meghalaya',
  },
  {
    city: 'North Garo Hills',
    state: 'Meghalaya',
  },
  {
    city: 'Aizawl',
    state: 'Mizoram',
  },
  {
    city: 'Champhai',
    state: 'Mizoram',
  },
  {
    city: 'Hnahthial',
    state: 'Mizoram',
  },
  {
    city: 'Khawzawl',
    state: 'Mizoram',
  },
  {
    city: 'Kolasib',
    state: 'Mizoram',
  },
  {
    city: 'Lawngtlai',
    state: 'Mizoram',
  },
  {
    city: 'Lunglei',
    state: 'Mizoram',
  },
  {
    city: 'Mamit',
    state: 'Mizoram',
  },
  {
    city: 'Saiha',
    state: 'Mizoram',
  },
  {
    city: 'Saitual',
    state: 'Mizoram',
  },
  {
    city: 'Serchhip',
    state: 'Mizoram',
  },
  {
    city: 'Dimapur',
    state: 'Nagaland',
  },
  {
    city: 'Kiphire',
    state: 'Nagaland',
  },
  {
    city: 'Kohima',
    state: 'Nagaland',
  },
  {
    city: 'Longleng',
    state: 'Nagaland',
  },
  {
    city: 'Mokokchung',
    state: 'Nagaland',
  },
  {
    city: 'Mon',
    state: 'Nagaland',
  },
  {
    city: 'Peren',
    state: 'Nagaland',
  },
  {
    city: 'Phek',
    state: 'Nagaland',
  },
  {
    city: 'Tuensang',
    state: 'Nagaland',
  },
  {
    city: 'Wokha',
    state: 'Nagaland',
  },
  {
    city: 'Zunheboto',
    state: 'Nagaland',
  },
  {
    city: 'Angul',
    state: 'Odisha',
  },
  {
    city: 'Boudh',
    state: 'Odisha',
  },
  {
    city: 'Balangir',
    state: 'Odisha',
  },
  {
    city: 'Bargarh',
    state: 'Odisha',
  },
  {
    city: 'Balasore(Baleswar)',
    state: 'Odisha',
  },
  {
    city: 'Bhadrak',
    state: 'Odisha',
  },
  {
    city: 'Cuttack',
    state: 'Odisha',
  },
  {
    city: 'Deogarh (Debagarh)',
    state: 'Odisha',
  },
  {
    city: 'Dhenkanal',
    state: 'Odisha',
  },
  {
    city: 'Ganjam',
    state: 'Odisha',
  },
  {
    city: 'Gajapati',
    state: 'Odisha',
  },
  {
    city: 'Jharsuguda',
    state: 'Odisha',
  },
  {
    city: 'Jajpur',
    state: 'Odisha',
  },
  {
    city: 'Jagatsinghapur',
    state: 'Odisha',
  },
  {
    city: 'Khordha',
    state: 'Odisha',
  },
  {
    city: 'Keonjhar (Kendujhar)',
    state: 'Odisha',
  },
  {
    city: 'Kalahandi',
    state: 'Odisha',
  },
  {
    city: 'Kandhamal',
    state: 'Odisha',
  },
  {
    city: 'Koraput',
    state: 'Odisha',
  },
  {
    city: 'Kendrapara',
    state: 'Odisha',
  },
  {
    city: 'Malkangiri',
    state: 'Odisha',
  },
  {
    city: 'Mayurbhanj',
    state: 'Odisha',
  },
  {
    city: 'Nabarangpur',
    state: 'Odisha',
  },
  {
    city: 'Nuapada',
    state: 'Odisha',
  },
  {
    city: 'Nayagarh',
    state: 'Odisha',
  },
  {
    city: 'Puri',
    state: 'Odisha',
  },
  {
    city: 'Rayagada',
    state: 'Odisha',
  },
  {
    city: 'Sambalpur',
    state: 'Odisha',
  },
  {
    city: 'Subarnapur (Sonepur)',
    state: 'Odisha',
  },
  {
    city: 'Sundargarh',
    state: 'Odisha',
  },
  {
    city: 'Karaikal',
    state: 'Puducherry',
  },
  {
    city: 'Mahe',
    state: 'Puducherry',
  },
  {
    city: 'Pondicherry',
    state: 'Puducherry',
  },
  {
    city: 'Yanam',
    state: 'Puducherry',
  },
  {
    city: 'Amritsar',
    state: 'Punjab',
  },
  {
    city: 'Gurdaspur',
    state: 'Punjab',
  },
  {
    city: 'Pathankot',
    state: 'Punjab',
  },
  {
    city: 'Tarn Taran',
    state: 'Punjab',
  },
  {
    city: 'Jalandhar',
    state: 'Punjab',
  },
  {
    city: 'Kapurthala',
    state: 'Punjab',
  },
  {
    city: 'Hoshiarpur',
    state: 'Punjab',
  },
  {
    city: 'Nawan Shehar',
    state: 'Punjab',
  },
  {
    city: 'Ludhiana',
    state: 'Punjab',
  },
  {
    city: 'Roop Nagar',
    state: 'Punjab',
  },
  {
    city: 'Fatehgarh Sahib',
    state: 'Punjab',
  },
  {
    city: 'Patiala',
    state: 'Punjab',
  },
  {
    city: 'Sangrur',
    state: 'Punjab',
  },
  {
    city: 'Barnala',
    state: 'Punjab',
  },
  {
    city: 'SAS Nagar(Mohali)',
    state: 'Punjab',
  },
  {
    city: 'Bathinda',
    state: 'Punjab',
  },
  {
    city: 'Mansa',
    state: 'Punjab',
  },
  {
    city: 'Muktsar',
    state: 'Punjab',
  },
  {
    city: 'Ferozepur',
    state: 'Punjab',
  },
  {
    city: 'Fazilka',
    state: 'Punjab',
  },
  {
    city: 'Faridkot',
    state: 'Punjab',
  },
  {
    city: 'Moga',
    state: 'Punjab',
  },
  {
    city: 'Malerkotla',
    state: 'Punjab',
  },
  {
    city: 'Ajmer',
    state: 'Rajasthan',
  },
  {
    city: 'Alwar',
    state: 'Rajasthan',
  },
  {
    city: 'Banswara',
    state: 'Rajasthan',
  },
  {
    city: 'Baran',
    state: 'Rajasthan',
  },
  {
    city: 'Barmer',
    state: 'Rajasthan',
  },
  {
    city: 'Bharatpur',
    state: 'Rajasthan',
  },
  {
    city: 'Bhilwara',
    state: 'Rajasthan',
  },
  {
    city: 'Bikaner',
    state: 'Rajasthan',
  },
  {
    city: 'Bundi',
    state: 'Rajasthan',
  },
  {
    city: 'Chittorgarh',
    state: 'Rajasthan',
  },
  {
    city: 'Churu',
    state: 'Rajasthan',
  },
  {
    city: 'Dausa',
    state: 'Rajasthan',
  },
  {
    city: 'Dholpur',
    state: 'Rajasthan',
  },
  {
    city: 'Dungarpur',
    state: 'Rajasthan',
  },
  {
    city: 'Hanumangarh',
    state: 'Rajasthan',
  },
  {
    city: 'Jaipur',
    state: 'Rajasthan',
  },
  {
    city: 'Jaisalmer',
    state: 'Rajasthan',
  },
  {
    city: 'Jalore',
    state: 'Rajasthan',
  },
  {
    city: 'Jhalawar',
    state: 'Rajasthan',
  },
  {
    city: 'Jhunjhunu',
    state: 'Rajasthan',
  },
  {
    city: 'Jodhpur',
    state: 'Rajasthan',
  },
  {
    city: 'Karauli',
    state: 'Rajasthan',
  },
  {
    city: 'Kota',
    state: 'Rajasthan',
  },
  {
    city: 'Nagaur',
    state: 'Rajasthan',
  },
  {
    city: 'Pali',
    state: 'Rajasthan',
  },
  {
    city: 'Pratapgarh',
    state: 'Rajasthan',
  },
  {
    city: 'Rajsamand',
    state: 'Rajasthan',
  },
  {
    city: 'Sawai Madhopur',
    state: 'Rajasthan',
  },
  {
    city: 'Sikar',
    state: 'Rajasthan',
  },
  {
    city: 'Sirohi',
    state: 'Rajasthan',
  },
  {
    city: 'Sri Ganganagar',
    state: 'Rajasthan',
  },
  {
    city: 'Tonk',
    state: 'Rajasthan',
  },
  {
    city: 'Udaipur',
    state: 'Rajasthan',
  },
  {
    city: 'East Sikkim district',
    state: 'Sikkim',
  },
  {
    city: 'North Sikkim district',
    state: 'Sikkim',
  },
  {
    city: 'South Sikkim district',
    state: 'Sikkim',
  },
  {
    city: 'West Sikkim district',
    state: 'Sikkim',
  },
  {
    city: 'Ariyalur',
    state: 'TamilNadu',
  },
  {
    city: 'Chengalpet',
    state: 'TamilNadu',
  },
  {
    city: 'Chennai',
    state: 'TamilNadu',
  },
  {
    city: 'Coimbatore',
    state: 'TamilNadu',
  },
  {
    city: 'Cuddalore',
    state: 'TamilNadu',
  },
  {
    city: 'Dharmapuri',
    state: 'TamilNadu',
  },
  {
    city: 'Dindigul',
    state: 'TamilNadu',
  },
  {
    city: 'Erode',
    state: 'TamilNadu',
  },
  {
    city: 'Kallakurichi',
    state: 'TamilNadu',
  },
  {
    city: 'Kancheepuram',
    state: 'TamilNadu',
  },
  {
    city: 'Karur',
    state: 'TamilNadu',
  },
  {
    city: 'Krishnagiri',
    state: 'TamilNadu',
  },
  {
    city: 'Kanyakumari',
    state: 'TamilNadu',
  },
  {
    city: 'Madurai',
    state: 'TamilNadu',
  },
  {
    city: 'Mayiladuthurai',
    state: 'TamilNadu',
  },
  {
    city: 'Nagapattinam',
    state: 'TamilNadu',
  },
  {
    city: 'Namakkal',
    state: 'TamilNadu',
  },
  {
    city: 'Perambalur',
    state: 'TamilNadu',
  },
  {
    city: 'Pudukottai',
    state: 'TamilNadu',
  },
  {
    city: 'Ramanathapuram',
    state: 'TamilNadu',
  },
  {
    city: 'Ranipet',
    state: 'TamilNadu',
  },
  {
    city: 'Salem',
    state: 'TamilNadu',
  },
  {
    city: 'Sivagangai',
    state: 'TamilNadu',
  },
  {
    city: 'Tenkasi',
    state: 'TamilNadu',
  },
  {
    city: 'Thanjavur',
    state: 'TamilNadu',
  },
  {
    city: 'Theni',
    state: 'TamilNadu',
  },
  {
    city: 'Thiruvallur',
    state: 'TamilNadu',
  },
  {
    city: 'Thiruvarur',
    state: 'TamilNadu',
  },
  {
    city: 'Tuticorin',
    state: 'TamilNadu',
  },
  {
    city: 'Trichirappalli',
    state: 'TamilNadu',
  },
  {
    city: 'Thirunelveli',
    state: 'TamilNadu',
  },
  {
    city: 'Tirupathur',
    state: 'TamilNadu',
  },
  {
    city: 'Tiruppur',
    state: 'TamilNadu',
  },
  {
    city: 'Tiruvannamalai',
    state: 'TamilNadu',
  },
  {
    city: 'The Nilgiris',
    state: 'TamilNadu',
  },
  {
    city: 'Vellore',
    state: 'TamilNadu',
  },
  {
    city: 'Viluppuram',
    state: 'TamilNadu',
  },
  {
    city: 'Virudhunagar',
    state: 'TamilNadu',
  },
  {
    city: 'ADILABAD',
    state: 'Telangana',
  },
  {
    city: 'BHADRADRI KOTHAGUDEM',
    state: 'Telangana',
  },
  {
    city: 'HANUMAKONDA',
    state: 'Telangana',
  },
  {
    city: 'HYDERABAD',
    state: 'Telangana',
  },
  {
    city: 'JAGTIAL',
    state: 'Telangana',
  },
  {
    city: 'JANGOAN',
    state: 'Telangana',
  },
  {
    city: 'JAYASHANKAR BHOOPALPALLY',
    state: 'Telangana',
  },
  {
    city: 'JOGULAMBA GADWAL',
    state: 'Telangana',
  },
  {
    city: 'KAMAREDDY',
    state: 'Telangana',
  },
  {
    city: 'KARIMNAGAR',
    state: 'Telangana',
  },
  {
    city: 'KHAMMAM',
    state: 'Telangana',
  },
  {
    city: 'KOMARAM BHEEM ASIFABAD',
    state: 'Telangana',
  },
  {
    city: 'MAHABUBABAD',
    state: 'Telangana',
  },
  {
    city: 'MAHABUBNAGAR',
    state: 'Telangana',
  },
  {
    city: 'MANCHERIAL',
    state: 'Telangana',
  },
  {
    city: 'MEDAK',
    state: 'Telangana',
  },
  {
    city: 'MEDCHAL-MALKAJGIRI',
    state: 'Telangana',
  },
  {
    city: 'MULUG',
    state: 'Telangana',
  },
  {
    city: 'NAGARKURNOOL',
    state: 'Telangana',
  },
  {
    city: 'NALGONDA',
    state: 'Telangana',
  },
  {
    city: 'NARAYANPET',
    state: 'Telangana',
  },
  {
    city: 'NIRMAL',
    state: 'Telangana',
  },
  {
    city: 'NIZAMABAD',
    state: 'Telangana',
  },
  {
    city: 'PEDDAPALLI',
    state: 'Telangana',
  },
  {
    city: 'RAJANNA SIRCILLA',
    state: 'Telangana',
  },
  {
    city: 'RANGAREDDY',
    state: 'Telangana',
  },
  {
    city: 'SANGAREDDY',
    state: 'Telangana',
  },
  {
    city: 'SIDDIPET',
    state: 'Telangana',
  },
  {
    city: 'SURYAPET',
    state: 'Telangana',
  },
  {
    city: 'VIKARABAD',
    state: 'Telangana',
  },
  {
    city: 'WANAPARTHY',
    state: 'Telangana',
  },
  {
    city: 'WARANGAL',
    state: 'Telangana',
  },
  {
    city: 'YADADRI BHUVANAGIRI',
    state: 'Telangana',
  },
  {
    city: 'West Tripura',
    state: 'Tripura',
  },
  {
    city: 'Khowai',
    state: 'Tripura',
  },
  {
    city: 'Sepahijala',
    state: 'Tripura',
  },
  {
    city: 'Gomati ',
    state: 'Tripura',
  },
  {
    city: 'South Tripura ',
    state: 'Tripura',
  },
  {
    city: 'Unakuti ',
    state: 'Tripura',
  },
  {
    city: 'North Tripura',
    state: 'Tripura',
  },
  {
    city: 'Dhalai',
    state: 'Tripura',
  },
  {
    city: 'Dehradun',
    state: 'Uttarakhand',
  },
  {
    city: 'Haridwar',
    state: 'Uttarakhand',
  },
  {
    city: 'Chamoli',
    state: 'Uttarakhand',
  },
  {
    city: 'Rudraprayag',
    state: 'Uttarakhand',
  },
  {
    city: 'Tehri Garhwal',
    state: 'Uttarakhand',
  },
  {
    city: 'Uttarkashi',
    state: 'Uttarakhand',
  },
  {
    city: 'Pauri Garhwal',
    state: 'Uttarakhand',
  },
  {
    city: 'Almora',
    state: 'Uttarakhand',
  },
  {
    city: 'Nainital',
    state: 'Uttarakhand',
  },
  {
    city: 'Pithoragarh',
    state: 'Uttarakhand',
  },
  {
    city: 'U S Nagar',
    state: 'Uttarakhand',
  },
  {
    city: 'Bageshwar',
    state: 'Uttarakhand',
  },
  {
    city: 'Champawat',
    state: 'Uttarakhand',
  },
  {
    city: 'Agra',
    state: 'UttarPradesh',
  },
  {
    city: 'Aligarh',
    state: 'UttarPradesh',
  },
  {
    city: 'Allahabad',
    state: 'UttarPradesh',
  },
  {
    city: 'Ambedkar Nagar',
    state: 'UttarPradesh',
  },
  {
    city: 'Amethi',
    state: 'UttarPradesh',
  },
  {
    city: 'Amroha',
    state: 'UttarPradesh',
  },
  {
    city: 'Auraiya',
    state: 'UttarPradesh',
  },
  {
    city: 'Azamgarh',
    state: 'UttarPradesh',
  },
  {
    city: 'Baghpat',
    state: 'UttarPradesh',
  },
  {
    city: 'Baliya',
    state: 'UttarPradesh',
  },
  {
    city: 'Balrampur',
    state: 'UttarPradesh',
  },
  {
    city: 'Banda',
    state: 'UttarPradesh',
  },
  {
    city: 'Barabanki',
    state: 'UttarPradesh',
  },
  {
    city: 'Bareilly',
    state: 'UttarPradesh',
  },
  {
    city: 'Basti',
    state: 'UttarPradesh',
  },
  {
    city: 'Bahraich',
    state: 'UttarPradesh',
  },
  {
    city: 'Bijnor',
    state: 'UttarPradesh',
  },
  {
    city: 'Budaun',
    state: 'UttarPradesh',
  },
  {
    city: 'Bulandshahr',
    state: 'UttarPradesh',
  },
  {
    city: 'Chandauli',
    state: 'UttarPradesh',
  },
  {
    city: 'Chitrakoot',
    state: 'UttarPradesh',
  },
  {
    city: 'Deoria',
    state: 'UttarPradesh',
  },
  {
    city: 'Eta',
    state: 'UttarPradesh',
  },
  {
    city: 'Etawah',
    state: 'UttarPradesh',
  },
  {
    city: 'Faizabad',
    state: 'UttarPradesh',
  },
  {
    city: 'Farrukhabad',
    state: 'UttarPradesh',
  },
  {
    city: 'Fatehpur',
    state: 'UttarPradesh',
  },
  {
    city: 'Firozabad',
    state: 'UttarPradesh',
  },
  {
    city: 'Gautam Budh Nagar(Noida)',
    state: 'UttarPradesh',
  },
  {
    city: 'Ghaziabad',
    state: 'UttarPradesh',
  },
  {
    city: 'Ghazipur',
    state: 'UttarPradesh',
  },
  {
    city: 'Gonda',
    state: 'UttarPradesh',
  },
  {
    city: 'Gorakhpur',
    state: 'UttarPradesh',
  },
  {
    city: 'Hapur',
    state: 'UttarPradesh',
  },
  {
    city: 'Hamirpur',
    state: 'UttarPradesh',
  },
  {
    city: 'Hardoi',
    state: 'UttarPradesh',
  },
  {
    city: 'Jalaun',
    state: 'UttarPradesh',
  },
  {
    city: 'Jaunpur',
    state: 'UttarPradesh',
  },
  {
    city: 'Jhansi',
    state: 'UttarPradesh',
  },
  {
    city: 'Kanpur Nagar',
    state: 'UttarPradesh',
  },
  {
    city: 'Kanpur Dehat',
    state: 'UttarPradesh',
  },
  {
    city: 'Kannauj',
    state: 'UttarPradesh',
  },
  {
    city: 'Kashiraam Nagar (Kasganj)',
    state: 'UttarPradesh',
  },
  {
    city: 'Kaushambi',
    state: 'UttarPradesh',
  },
  {
    city: 'Kushinagar',
    state: 'UttarPradesh',
  },
  {
    city: 'Lakhimpur Kheri',
    state: 'UttarPradesh',
  },
  {
    city: 'Lalitpur',
    state: 'UttarPradesh',
  },
  {
    city: 'Lucknow',
    state: 'UttarPradesh',
  },
  {
    city: 'Hathras',
    state: 'UttarPradesh',
  },
  {
    city: 'Mahrajganj',
    state: 'UttarPradesh',
  },
  {
    city: 'Mahoba',
    state: 'UttarPradesh',
  },
  {
    city: 'Mainpuri',
    state: 'UttarPradesh',
  },
  {
    city: 'Mathura',
    state: 'UttarPradesh',
  },
  {
    city: 'Mau',
    state: 'UttarPradesh',
  },
  {
    city: 'Meerut',
    state: 'UttarPradesh',
  },
  {
    city: 'Mirzapur',
    state: 'UttarPradesh',
  },
  {
    city: 'Moradabad',
    state: 'UttarPradesh',
  },
  {
    city: 'Muzaffarnagar',
    state: 'UttarPradesh',
  },
  {
    city: 'Pilibhit',
    state: 'UttarPradesh',
  },
  {
    city: 'Pratapgarh',
    state: 'UttarPradesh',
  },
  {
    city: 'Raibareli',
    state: 'UttarPradesh',
  },
  {
    city: 'Rampur',
    state: 'UttarPradesh',
  },
  {
    city: 'Saharanpur',
    state: 'UttarPradesh',
  },
  {
    city: 'Sambhal',
    state: 'UttarPradesh',
  },
  {
    city: 'Sant Kabir Nagar (Khalilabad)',
    state: 'UttarPradesh',
  },
  {
    city: 'Sant Ravi Das Nagar (Bhadohi)',
    state: 'UttarPradesh',
  },
  {
    city: 'Shahjahanpur',
    state: 'UttarPradesh',
  },
  {
    city: 'Shamli',
    state: 'UttarPradesh',
  },
  {
    city: 'Shravasti',
    state: 'UttarPradesh',
  },
  {
    city: 'Siddharth Nagar',
    state: 'UttarPradesh',
  },
  {
    city: 'Sitapur',
    state: 'UttarPradesh',
  },
  {
    city: 'Sonbhadra',
    state: 'UttarPradesh',
  },
  {
    city: 'Sultanpur',
    state: 'UttarPradesh',
  },
  {
    city: 'Unnao',
    state: 'UttarPradesh',
  },
  {
    city: 'Varanasi',
    state: 'UttarPradesh',
  },
  {
    city: 'North 24 Parganas',
    state: 'WestBengal',
  },
  {
    city: 'South 24 Parganas',
    state: 'WestBengal',
  },
  {
    city: 'Bankura',
    state: 'WestBengal',
  },
  {
    city: 'Birbhum',
    state: 'WestBengal',
  },
  {
    city: 'CoochBihar',
    state: 'WestBengal',
  },
  {
    city: 'Dakshin Dinajpur',
    state: 'WestBengal',
  },
  {
    city: 'Darjeeling',
    state: 'WestBengal',
  },
  {
    city: 'Hooghly',
    state: 'WestBengal',
  },
  {
    city: 'Howrah',
    state: 'WestBengal',
  },
  {
    city: 'Jalpaiguri',
    state: 'WestBengal',
  },
  {
    city: 'Jhargram',
    state: 'WestBengal',
  },
  {
    city: 'Kalimpong',
    state: 'WestBengal',
  },
  {
    city: 'Kolkata',
    state: 'WestBengal',
  },
  {
    city: 'Malda',
    state: 'WestBengal',
  },
  {
    city: 'Murshidabad',
    state: 'WestBengal',
  },
  {
    city: 'Nadia',
    state: 'WestBengal',
  },
  {
    city: 'Paschim Burdwan',
    state: 'WestBengal',
  },
  {
    city: 'Purba Burdwan',
    state: 'WestBengal',
  },
  {
    city: 'Paschim Medinipur',
    state: 'WestBengal',
  },
  {
    city: 'Purba Medinipur',
    state: 'WestBengal',
  },
  {
    city: 'Purulia',
    state: 'WestBengal',
  },
  {
    city: 'Uttar Dinajpur',
    state: 'WestBengal',
  },
  {
    city: 'Alipurduar',
    state: 'WestBengal',
  },
];

export function getCityNames() {
    return cities;
}