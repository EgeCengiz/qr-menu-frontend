import type { Category } from '../types/menu';

export const CATEGORIES: Category[] = [
  {
    id: 'kahvalti',
    num: '01',
    subtitle: 'GÜNE İYİ BAŞLA',
    title: 'Kahvaltı',
    itemCount: '18 ÜRÜN',
    img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800',
    subCategories: [
      { id: 'kahvaltilar', title: 'KAHVALTILAR', itemCount: '10 ÜRÜN' },
      { id: 'extra-kahvalti', title: 'EXTRA KAHVALTI', itemCount: '8 ÜRÜN' }
    ],
    items: [
      { 
        id: 1, 
        subCategory: 'kahvaltilar',
        name: 'EKMEK ÜSTÜ KAHVALTI', 
        desc: 'ekşi mayalı ekmek üzerine eritilmiş mozzerella çeri domates roka yaprakları pesto sos parmak patates ve renç sos ile', 
        price: '300,00 ₺', 
        img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 2, 
        subCategory: 'kahvaltilar',
        name: 'GARANOLO BOWL', 
        desc: 'yoğurt üzerine mevsim meyveleri garanola badem chia tohumu', 
        price: '350,00 ₺', 
        img: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 3, 
        subCategory: 'kahvaltilar',
        name: 'İDEAL KAHVALTI', 
        desc: '2 KİŞİLİK- BEYAZ PEYNİR-KAŞAR-BURGER PEYNİR-BAL KAYMAK-TEREYAĞI-REÇEL-ZEYTİN-DOMATES-SALATALIK-OMLET-PATATES-SİGARABÖREĞİ-SOĞAN HALKASI', 
        price: '900,00 ₺', 
        img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 4, 
        subCategory: 'kahvaltilar',
        name: 'KAHVALTI ÇAYI', 
        desc: 'taze demlenmiş rize çayı', 
        price: '0,00 ₺', 
        img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 5, 
        subCategory: 'kahvaltilar',
        name: 'KAHVALTI SALATASI', 
        desc: 'simit-çeri domates-salatalık-ezine peyniri-yeşil biber-mısır-vini gret sos', 
        price: '360,00 ₺', 
        img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 6, 
        subCategory: 'kahvaltilar',
        name: 'KAHVALTI TABAĞI', 
        desc: 'beyaz peynir. kaşar peynir. burgu peyniri .siyah zeytin.yeşil zeytin. biberli yeşil zeytin.domates salatalık.yeşillik.bal .vişne reçel.ayva reçel. Çikolata. sahanda yumurta. Patates. sosis .sigara böreği', 
        price: '450,00 ₺', 
        img: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 7, 
        subCategory: 'kahvaltilar',
        name: 'PEYNİR TABAĞI', 
        desc: 'ezine, kaşar, tulum ve burgu peyniri çeşitleri, ceviz ve mevsim meyveleri ile', 
        price: '200,00 ₺', 
        img: 'https://images.unsplash.com/photo-1631379578550-7038263db699?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 8, 
        subCategory: 'kahvaltilar',
        name: 'SERPME KAHVALTI KIŞI BAŞI', 
        desc: 'ezine peyniri, beyaz peynir, kaşar, burgu peynir, topi peynir, maydanoz, çörek otlu minci, tereyağı, siyah zeytin, çizik zeytin, biberli, yeşil zeytin, bal-kaymak, tahin-pekmez, vişne reçeli, ayva reçeli, çikolata, kahvaltılık ezme, yoğurtlu meze, pembe sultan, domates, salata, biber, sahanda yumurta, menemen, kaygana. parmak börek, soğan halkası, salam, soslu sosis, parmak patates, krep, patates kavurması. (EN AZ İKİ KİŞİ İLE SERVİS AÇILMAKTADIR)', 
        price: '650,00 ₺', 
        img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 9, 
        subCategory: 'kahvaltilar',
        name: 'YAZ KAHVALTISI', 
        desc: 'fresh meyve-soğuk yoğurt-badem - ceviz', 
        price: '300,00 ₺', 
        img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 10, 
        subCategory: 'kahvaltilar',
        name: 'MIHLAMA / KUYMAK', 
        desc: 'yayla tereyağı mısır unu ve köy kolot peyniri ile', 
        price: '260,00 ₺', 
        img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 11, 
        subCategory: 'extra-kahvalti',
        name: 'PASTIRMA', 
        desc: 'ızgarada sotelenmiş özel pastırma dilimleri', 
        price: '350,00 ₺', 
        img: 'https://images.unsplash.com/photo-1544025162-8315ea07620a?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 12, 
        subCategory: 'extra-kahvalti',
        name: 'BEYAZ PEYNİRLİ OMLET', 
        desc: 'akdeniz yeşillikleri ve green sos ile', 
        price: '165,00 ₺', 
        img: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 13, 
        subCategory: 'extra-kahvalti',
        name: 'SUCUKLU SAHANDA YUMURTA', 
        desc: 'özel afyon sucuğu ve sahanda tereyağlı yumurta', 
        price: '220,00 ₺', 
        img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 14, 
        subCategory: 'extra-kahvalti',
        name: 'KAVURMALI SAHANDA YUMURTA', 
        desc: 'rize kavurması ile sahanda yumurta', 
        price: '280,00 ₺', 
        img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 15, 
        subCategory: 'extra-kahvalti',
        name: 'MENEMEN', 
        desc: 'taze domates, sivri biber ve yumurta', 
        price: '190,00 ₺', 
        img: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 16, 
        subCategory: 'extra-kahvalti',
        name: 'PATATES KIZARTMASI', 
        desc: 'özel baharatlı parmak patates', 
        price: '140,00 ₺', 
        img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 17, 
        subCategory: 'extra-kahvalti',
        name: 'SİGARA BÖREĞİ', 
        desc: 'el açması çıtır peynirli börek (6 adet)', 
        price: '150,00 ₺', 
        img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 18, 
        subCategory: 'extra-kahvalti',
        name: 'PANCAKE TABAĞI', 
        desc: 'taze meyveler ve sıcak çikolata sosu ile', 
        price: '210,00 ₺', 
        img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=400' 
      }
    ]
  },
  {
    id: 'mutfak',
    num: '02',
    subtitle: 'ŞEFTEN İMZA LEZZETLER',
    title: 'Mutfak',
    itemCount: '24 ÜRÜN',
    img: 'https://images.unsplash.com/photo-1544025162-8315ea07620a?auto=format&fit=crop&q=80&w=800',
    subCategories: [
      { id: 'burger-sandvic', title: 'BURGER & SANDVİÇ', itemCount: '10 ÜRÜN' },
      { id: 'izgaralar', title: 'IZGARALAR & ANA YEMEKLER', itemCount: '8 ÜRÜN' },
      { id: 'makarnalar', title: 'MAKARNALAR & PASTA', itemCount: '6 ÜRÜN' }
    ],
    items: [
      { 
        id: 19, 
        subCategory: 'burger-sandvic',
        name: 'HOOKAHLAB SPECIAL BURGER', 
        desc: '180gr dana köfte, karamelize soğan, cheddarlı özel lab sosu ve parmak patates ile', 
        price: '380,00 ₺', 
        img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 20, 
        subCategory: 'burger-sandvic',
        name: 'CHICKEN CRISPY BURGER', 
        desc: 'çıtır tavuk bonfile, sezar sos, marul, turşu ve patates kızartması', 
        price: '320,00 ₺', 
        img: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 21, 
        subCategory: 'izgaralar',
        name: 'DANA ANTRİKOT IZGARA', 
        desc: 'fırınlanmış patates püre yatağında, özel mantar sosu ve ızgara sebzeler eşliğinde 200gr antrikot', 
        price: '680,00 ₺', 
        img: 'https://images.unsplash.com/photo-1544025162-8315ea07620a?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 22, 
        subCategory: 'izgaralar',
        name: 'TAVUK FAJITA', 
        desc: 'sote biber ve soğanlarla renkli döküm tavada, tortilla ekmeği ve özel soslar ile', 
        price: '380,00 ₺', 
        img: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 23, 
        subCategory: 'makarnalar',
        name: 'PENNE ARRABBIATA', 
        desc: 'acılı domates sos, siyah zeytin, taze fesleğen ve parmesan peyniri', 
        price: '240,00 ₺', 
        img: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 24, 
        subCategory: 'makarnalar',
        name: 'FETTUCCINE ALFREDO', 
        desc: 'julyen tavuk dilimleri, krema, kültür mantarı ve taze fesleğen', 
        price: '270,00 ₺', 
        img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=400' 
      }
    ]
  },
  {
    id: 'kahve-sicak',
    num: '03',
    subtitle: 'TAZE DEMLEME & KAHVELER',
    title: 'Kahve & Sıcak',
    itemCount: '16 ÜRÜN',
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
    subCategories: [
      { id: 'espresso-bazli', title: 'ESPRESSO BAZLI', itemCount: '10 ÜRÜN' },
      { id: 'demleme-caylar', title: 'DEMLEME & BİTKİ ÇAYLARI', itemCount: '6 ÜRÜN' }
    ],
    items: [
      { 
        id: 25, 
        subCategory: 'espresso-bazli',
        name: 'LATTE MACCHIATO', 
        desc: 'taze kavrulmuş espresso çekirdekleri ve kadifemsi süt köpüğü', 
        price: '110,00 ₺', 
        img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 26, 
        subCategory: 'espresso-bazli',
        name: 'CAPPUCCINO', 
        desc: 'yoğun espresso bazı ve bol süt köpüğü', 
        price: '105,00 ₺', 
        img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 27, 
        subCategory: 'espresso-bazli',
        name: 'AMERICANO', 
        desc: 'çift shot espresso ve sıcak su', 
        price: '95,00 ₺', 
        img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 28, 
        subCategory: 'demleme-caylar',
        name: 'TÜRK ÇAYI (BARDAK)', 
        desc: 'özel rize harmanı taze demlenmiş çay', 
        price: '35,00 ₺', 
        img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 29, 
        subCategory: 'demleme-caylar',
        name: 'KIS ÇAYI DEMLİK', 
        desc: 'ıhlamur, adaçayı, zencefil, çubuk tarçın, karanfil ve bal', 
        price: '160,00 ₺', 
        img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400' 
      }
    ]
  },
  {
    id: 'soguk-icecekler',
    num: '04',
    subtitle: 'FERAHLATAN LEZZETLER',
    title: 'Soğuk İçecekler',
    itemCount: '20 ÜRÜN',
    img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    subCategories: [
      { id: 'frozen-milkshake', title: 'FROZEN & MILKSHAKE', itemCount: '10 ÜRÜN' },
      { id: 'kokteyller', title: 'MOCKTAIL & MEYVE SUYU', itemCount: '10 ÜRÜN' }
    ],
    items: [
      { 
        id: 30, 
        subCategory: 'frozen-milkshake',
        name: 'MANGO FROZEN', 
        desc: 'taze mango püresi, kırılmış buz ve nane', 
        price: '155,00 ₺', 
        img: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 31, 
        subCategory: 'frozen-milkshake',
        name: 'BELÇİKA ÇİKOLATALI MILKSHAKE', 
        desc: 'gerçek belçika çikolatası dondurması, soğuk süt ve krema', 
        price: '165,00 ₺', 
        img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 32, 
        subCategory: 'kokteyller',
        name: 'MOJITO VIRGIN', 
        desc: 'taze nane, misket limonu, esmer şeker ve soda', 
        price: '145,00 ₺', 
        img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400' 
      }
    ]
  },
  {
    id: 'tatlilar',
    num: '05',
    subtitle: 'TATLI BİR MOLA',
    title: 'Tatlılar',
    itemCount: '12 ÜRÜN',
    img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800',
    subCategories: [
      { id: 'pastalar', title: 'PASTALAR & CHEESECAKE', itemCount: '7 ÜRÜN' },
      { id: 'sicak-tatlilar', title: 'SICAK TATLILAR', itemCount: '5 ÜRÜN' }
    ],
    items: [
      { 
        id: 33, 
        subCategory: 'pastalar',
        name: 'SAN SEBASTIAN CHEESECAKE', 
        desc: 'orijinal reçete, yanında eritilmiş sıcak Belçika çikolatası ile servis edilir', 
        price: '210,00 ₺', 
        img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 34, 
        subCategory: 'sicak-tatlilar',
        name: 'SICAK ÇİKOLATALI SUFLE', 
        desc: 'akışkan bitter çikolatalı iç dolgu, yanında sade dondurma ile', 
        price: '185,00 ₺', 
        img: 'https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&q=80&w=400' 
      }
    ]
  },
  {
    id: 'nargile',
    num: '06',
    subtitle: 'ÖZEL KARIŞIMLAR',
    title: 'Hookah',
    itemCount: '35 ÜRÜN',
    img: 'https://images.unsplash.com/photo-1510375685784-2131976079c6?auto=format&fit=crop&q=80&w=800',
    subCategories: [
      { id: 'imza-karisimlar', title: 'İMZA KARIŞIMLAR', itemCount: '15 ÜRÜN' },
      { id: 'klasik-aroma', title: 'KLASİK AROMALAR', itemCount: '20 ÜRÜN' }
    ],
    items: [
      { 
        id: 35, 
        subCategory: 'imza-karisimlar',
        name: 'LAB SIGNATURE NARGİLE', 
        desc: 'ananas, nane, çarkıfelek meyvesi ve gizli lab şurubu ile hazırlanmış imza karışım', 
        price: '450,00 ₺', 
        img: 'https://images.unsplash.com/photo-1510375685784-2131976079c6?auto=format&fit=crop&q=80&w=400' 
      },
      { 
        id: 36, 
        subCategory: 'klasik-aroma',
        name: 'KLASİK ÇİFT ELMA', 
        desc: 'anason ve elmanın geleneksel, sert ve yoğun buluşması', 
        price: '350,00 ₺', 
        img: 'https://images.unsplash.com/photo-1579545802287-34758d8442a8?auto=format&fit=crop&q=80&w=400' 
      }
    ]
  }
];
