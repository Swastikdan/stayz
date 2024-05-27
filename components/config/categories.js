const categories = [
  {
    name: 'Rooms',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//7630c83f-96a8-4232-9a10-0398661e2e6f.jpg',
    value: 'rooms',
  },
  {
    name: 'Countryside',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
    value: 'countryside',
  },
  {
    name: 'Views',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg',
    value: 'views',
  },
  {
    name: 'Caves',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//4221e293-4770-4ea8-a4fa-9972158d4004.jpg',
    value: 'caves',
  },
  {
    name: 'Play',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg',
    value: 'play',
  },
  {
    name: 'Boats',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg',
    value: 'boats',
  },
  {
    name: 'Vineyards',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg',
    value: 'vineyards',
  },
  {
    name: 'Luxe',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg',
    value: 'luxe',
  },
  {
    name: 'Lake',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//a4634ca6-1407-4864-ab97-6e141967d782.jpg',
    value: 'lake',
  },
  {
    name: 'A-frames',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//1d477273-96d6-4819-9bda-9085f809dad3.jpg',
    value: 'a-frames',
  },
  {
    name: 'Beach',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg',
    value: 'beach',
  },
  {
    name: 'Castles',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg',
    value: 'castles',
  },
  {
    name: 'Containers',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//0ff9740e-52a2-4cd5-ae5a-94e1bfb560d6.jpg',
    value: 'containers',
  },
  {
    name: 'Historical',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg',
    value: 'historical',
  },
  {
    name: 'Tropical',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg',
    value: 'tropical',
  },
  {
    name: 'OMG!',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg',
    value: 'omg!',
  },
  {
    name: 'Camping',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg',
    value: 'camping',
  },
  {
    name: 'Surfing',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg',
    value: 'surfing',
  },
  {
    name: 'New',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg',
    value: 'new',
  },
  {
    name: 'Cabins',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg',
    value: 'cabins',
  },
  {
    name: 'Trending',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//3726d94b-534a-42b8-bca0-a0304d912260.jpg',
    value: 'trending',
  },
  {
    name: 'Lakefront',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//677a041d-7264-4c45-bb72-52bff21eb6e8.jpg',
    value: 'lakefront',
  },
  {
    name: 'Earth homes',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg',
    value: 'earth-homes',
  },
  {
    name: 'Camper vans',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//31c1d523-cc46-45b3-957a-da76c30c85f9.jpg',
    value: 'camper-vans',
  },
  {
    name: 'Islands',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//8e507f16-4943-4be9-b707-59bd38d56309.jpg',
    value: 'islands',
  },
  {
    name: 'Pools',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//3fb523a0-b622-4368-8142-b5e03df7549b.jpg',
    value: 'pools',
  },
  {
    name: 'Arctic',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg',
    value: 'arctic',
  },
  {
    name: 'Design',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//50861fca-582c-4bcc-89d3-857fb7ca6528.jpg',
    value: 'design',
  },
  {
    name: 'Tiny homes',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg',
    value: 'tiny-homes',
  },
  {
    name: 'National parks',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//c0a24c04-ce1f-490c-833f-987613930eca.jpg',
    value: 'national-parks',
  },
  {
    name: 'Iconic cities',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg',
    value: 'iconic-cities',
  },
  {
    name: 'Treehouses',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg',
    value: 'treehouses',
  },
  {
    name: 'Farms',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg',
    value: 'farms',
  },
  {
    name: 'Mansions',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//78ba8486-6ba6-4a43-a56d-f556189193da.jpg',
    value: 'mansions',
  },
  {
    name: 'Golfing',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//6b639c8d-cf9b-41fb-91a0-91af9d7677cc.jpg',
    value: 'golfing',
  },
  {
    name: 'Hanoks',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//51f5cf64-5821-400c-8033-8a10c7787d69.jpg',
    value: 'hanoks',
  },
  {
    name: 'Skiing',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg',
    value: 'skiing',
  },
  {
    name: 'Ryokans',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//827c5623-d182-474a-823c-db3894490896.jpg',
    value: 'ryokans',
  },
  {
    name: 'Off-the-grid',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg',
    value: 'off-the-grid',
  },
  {
    name: 'Windmills',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//5cdb8451-8f75-4c5f-a17d-33ee228e3db8.jpg',
    value: 'windmills',
  },
  {
    name: 'Beachfront',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg',
    value: 'beachfront',
  },
  {
    name: 'Minsus',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//48b55f09-f51c-4ff5-b2c6-7f6bd4d1e049.jpg',
    value: 'minsus',
  },
  {
    name: 'Domes',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg',
    value: 'domes',
  },
  {
    name: 'Yurts',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//4759a0a7-96a8-4dcd-9490-ed785af6df14.jpg',
    value: 'yurts',
  },
  {
    name: 'Towers',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//d721318f-4752-417d-b4fa-77da3cbc3269.jpg',
    value: 'towers',
  },
  {
    name: 'Barns',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//f60700bc-8ab5-424c-912b-6ef17abc479a.jpg',
    value: 'barns',
  },
  {
    name: 'Desert',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//a6dd2bae-5fd0-4b28-b123-206783b5de1d.jpg',
    value: 'desert',
  },
  {
    name: 'Ski-in/out',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg',
    value: 'ski-in-out',
  },
  {
    name: 'Houseboats',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg',
    value: 'houseboats',
  },
  {
    name: 'Adapted',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg',
    value: 'adapted',
  },
  {
    name: 'Grand pianos',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//8eccb972-4bd6-43c5-ac83-27822c0d3dcd.jpg',
    value: 'grand-pianos',
  },
  {
    name: 'Creative',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg',
    value: 'creative',
  },
  {
    name: 'Dammusi',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//c9157d0a-98fe-4516-af81-44022118fbc7.jpg',
    value: 'dammusi',
  },
  {
    name: 'Riads',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//7ff6e4a1-51b4-4671-bc9a-6f523f196c61.jpg',
    value: 'riads',
  },
  {
    name: 'Trulli',
    icon: 'https://res.cloudinary.com/debewnh29/image/upload/pictures//33848f9e-8dd6-4777-b905-ed38342bacb9.jpg',
    value: 'trulli',
  },
];

export default categories;
