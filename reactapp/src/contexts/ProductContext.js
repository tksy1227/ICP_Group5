import React, { createContext, useContext, useState, useEffect } from 'react';

// Import product images (keep all your existing imports)
import sawitproFertilizer50kgPlus40kgBunchAshImage from '../images/products/SawitPRO_Fertilizer_50kg_+_40kg_Bunch_Ash.avif';
import siBrondolSawitproTshirtSizeXlImage from '../images/products/Si_Brondol_SawitPRO_T-shirt_size_XL.avif';
import furadan3gr2kgImage from '../images/products/Furadan_3GR_2Kg.avif';
import garlon670Ec1LiterImage from '../images/products/Garlon_670_EC_1Liter.avif';
import garlon670Ec100mlImage from '../images/products/Garlon_670_EC_100ml.avif';
import bombUp520Sl20LitersImage from '../images/products/Bomb_Up_520_SL_20Liters.avif';
import bombUp520Sl5LiterImage from '../images/products/Bomb_Up_520_SL_5Liters.avif';
import post480Sl1LiterImage from '../images/products/Post_480_SL_1Liter.avif';
import pillarUp480Sl20LiterImage from '../images/products/Pillar_Up_480_SL_20Liter.avif';
import pillarUp480Sl5LiterImage from '../images/products/Pillar_Up_480_SL_5Liter.avif';
import pillarUp480Sl1LiterImage from '../images/products/Pillar_Up_480_SL_1Liter.avif';
import touchdown480Sl20LitersImage from '../images/products/Touchdown_480_SL_20Liters.avif';
import touchdown480Sl4LiterImage from '../images/products/Touchdown_480_SL_4Liters.avif';
import touchdown480Sl1LiterImage from '../images/products/Touchdown_480_SL_1Liters.avif';
import eagle480Sl20LitersImage from '../images/products/Eagle_480_SL_20Liters.avif';
import eagle480Sl1LiterImage from '../images/products/Eagle_480_SL_1Liter.avif';
import smart486Sl20LitersImage from '../images/products/Smart_486_SL_20Liters.avif';
import smart486Sl4LitersImage from '../images/products/Smart_486_SL_4Liter.avif';
import smart486Sl1LiterImage from '../images/products/Smart_486_SL_1Liter.avif';
import konUp480Sl1LiterImage from '../images/products/Kon_Up_480_SL_1Liter.avif';
import triester670Ec250mlImage from '../images/products/Triester_670_EC_250ml.avif';
import triester670Ec100mlImage from '../images/products/Triester_670_EC_100ml.avif';
import daimex80Wp250grImage from '../images/products/Daimex_80_WP_250gr.avif';
import marxone300Sl5LiterImage from '../images/products/Marxone_300_SL_5Liter.avif';
import marxone300Sl20LiterImage from '../images/products/Marxone_300_SL_20Liter.avif';
import batara135Sl20LiterImage from '../images/products/Batara_135_SL_20Liter.avif';
import batara135Sl4LiterImage from '../images/products/Batara_135_SL_4Liter.avif';
import batara135Sl1LiterImage from '../images/products/Batara_135_SL_1Liter.avif';
import metsulindo20Wp100GrImage from '../images/products/Metsulindo_20_WP_100gr.avif';
import metsulindo20Wp250grImage from '../images/products/Metsulindo_20_WP_250gr.avif';
import supremo480Sl20LImage from '../images/products/Supremo_480_SL_20L.avif';
import supremo480Sl4LImage from '../images/products/Supremo_480_SL_4L.avif';
import supremo480Sl1LImage from '../images/products/Supremo_480_SL_1L.avif';
import topzone276Sl4LiterImage from '../images/products/Topzone_276_SL_4Liter.avif';
import topzone276Sl20LiterImage from '../images/products/Topzone_276_SL_20Liter.avif';
import supretox276Sl4LiterImage from '../images/products/Supretox_276_SL_4Liter.avif';
import supretox276Sl1LiterImage from '../images/products/Supretox_276_SL_1Liter.avif';
import roundUp486Sl4LiterImage from '../images/products/Round_Up_486_SL_4Liter.avif';
import ramoxone278Sl20LiterImage from '../images/products/Ramoxone_278_SL_20Liter.avif';
import ramoxone278Sl1LiterImage from '../images/products/Ramoxone_278_SL_1Liter.avif';
import predo290Sl20LiterImage from '../images/products/Predo_290_SL_20Liter.avif';
import predo290Sl1LiterImage from '../images/products/Predo_290_SL_1Liter.avif';
import noxone297Sl5LiterImage from '../images/products/Noxone_297_SL_5Liter.avif';
import noxone297Sl1LiterImage from '../images/products/Noxone_297_SL_1Liter.avif';
import herbatop276Sl5LiterImage from '../images/products/Herbatop_276_SL_5Liter.avif';
import herbatop276Sl20LiterImage from '../images/products/Herbatop_276_SL_20Liter.avif';
import herbatop276Sl1LiterImage from '../images/products/Herbatop_276_SL_1Liter.avif';
import gramoxone276Sl250mlImage from '../images/products/Gramoxone_276SL_250ml.avif';
import gramoxone276Sl20LiterImage from '../images/products/Gramoxone_276_SL_20Liter.avif';
import gramoxone276Sl5LiterImage from '../images/products/Gramoxone_276_SL_5Liter.avif';
import gramoxone276Sl1LiterImage from '../images/products/Gramoxone_276_SL_1Liter.avif';
import centatop288Sl5LiterImage from '../images/products/Centatop_288_SL_5Liter.avif';
import centatop288Sl20LiterImage from '../images/products/Centatop_288_SL_20Liter.avif';
import centatop288Sl1LiterImage from '../images/products/Centatop_288_SL_1Liter.avif';
import bablass490Sl5LiterImage from '../images/products/Bablass_490_SL_5Liter.avif';
import bablass490Sl20LiterImage from '../images/products/Bablass_490_SL_20Liter.avif';
import bablass490Sl1LiterImage from '../images/products/Bablass_490_SL_1Liter.avif';
import npkDgw1362750kgImage from '../images/products/NPK_DGW_13_6_27_50kg.avif';
import merokeKornKaliBKkb50kgImage from '../images/products/Meroke_Korn_Kali_B_(KKB)_50kg.avif';
import pupukSawitpro50kgImage from '../images/products/Pupuk_SawitPRO_50kg.avif';
import kaosAgenInovasiSawitproImage from '../images/products/Kaos_Agen_Inovasi_SawitPRO.avif';
import topiSawitproImage from '../images/products/Topi_SawitPRO.avif';
import kaosAgenInovasiPlusTopiHijauPlusGoodieBagImage from '../images/products/Kaos_Agen_Inovasi_+_Topi_Hijau_+_Goodie_Bag.avif';
import herbisidaTopzone276Sl1LiterImage from '../images/products/Herbisida_Topzone_276_SL_1Liter.avif';
import herbisidaRoundUp486Sl1LiterImage from '../images/products/Herbisida_Round_Up_486_SL_1Liter.avif';
import supretox276Sl20LiterAltImage from '../images/products/Supretox_276_SL_20Liter.avif';
import herbisidaNoxone297Sl20LiterImage from '../images/products/Herbisida_Noxone_297_SL_20Liter.avif';
import herbisidaRoundUp486Sl20LiterImage from '../images/products/Herbisida_Round_Up_486_SL_20Liter.avif';
import tspChinaCapDaun50kgImage from '../images/products/TSP_China_Cap_Daun_50kg.avif';
import npkDgw138274Te50kgImage from '../images/products/NPK_DGW_13_8_27_4_TE_50kg.avif';
import rpCapDaun50kgImage from '../images/products/RP_Cap_Daun_50kg.avif';
import kapurPertanianKebomas50KgImage from '../images/products/Kapur_Pertanian_Kebomas_50kg.avif';
import ssAmmophos50kgImage from '../images/products/SS_(AMMOPHOS)_50kg.avif';
import rpMahkota50kgEgyptImage from '../images/products/RP_Mahkota_50kg_Egypt.avif';
import dolomiteM10050kgImage from '../images/products/Dolomite_M_100_50kg.avif';
import npkMutiara16161650kgImage from '../images/products/NPK_Mutiara_16_16_16_50kg.avif';
import npkYaramila16161650kgImage from '../images/products/NPK_Yaramila_16_16_16_50kg.avif';
import borateMahkota25kgImage from '../images/products/Borate_Mahkota_25kg.avif';
import npkPhonskaPlus15151525kgImage from '../images/products/NPK_Phonska_Plus_15_15_15_25kg.avif';
import mahkotaZa50kgImage from '../images/products/Mahkota_ZA_50kg.avif';
import pupukMopKclCanadaCapMahkota50KgImage from '../images/products/Pupuk_MOP_KCL_Canada_Cap_Mahkota_50kg.avif';
import sawitprologoImage from '../images/sawitpro_logo.png';

const ProductContext = createContext();

// Backend API URL
const API_BASE_URL = 'http://localhost:3001';

// Image mapping function - maps database product names to imported images
const getProductImage = (productName, productSku) => {
    const nameKey = productName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    console.log('Mapping image for:', productName, '-> nameKey:', nameKey);
    // Removed unused imports: petanNaikLogo, usericon
    // Basic image mapping - add more as needed based on your database product names
    const imageMap = {
    'ujisampeldaun': sawitprologoImage,
    'topisawitprohijau': topiSawitproImage,
    'kaosageninovasitopihijaugoodiebag': kaosAgenInovasiPlusTopiHijauPlusGoodieBagImage,
    'kaosageninovasisawitprosizel': kaosAgenInovasiSawitproImage,
    'kaospolosawitproukkuranxl': sawitprologoImage,
    'benihsawittopaz13seri4100butir': sawitprologoImage, 
    'kuponbelanja150000': sawitprologoImage,
    'kuponbelanja25000': sawitprologoImage,
    'tokenpln100000': sawitprologoImage,
    'tokenpln200000': sawitprologoImage,
    'kuponbelanja200000': sawitprologoImage,
    'kuponbelanja500000': sawitprologoImage,
    'kuponbelanja50000': sawitprologoImage,
    'kuponbelanja100000': sawitprologoImage,
    'minyakkorengcamar2liter': sawitprologoImage,
    'mopkclcapdaun50kg': sawitprologoImage,
    'pulsatelkomsel150000': sawitprologoImage,
    'pulsatelkomsel25000': sawitprologoImage,
    'pulsatelkomsel50000': sawitprologoImage,
    'pulsatelkomsel200000': sawitprologoImage,
    'tokenpln20000': sawitprologoImage,
    'pulsatelkomsel300000': sawitprologoImage,
    'pulsatelkomsel100000': sawitprologoImage,
    'tokenpln50000': sawitprologoImage,
    'minyakkorengcamar1literramadhanberkah': sawitprologoImage,
    'fosfatphosgreen25kg': sawitprologoImage,
    'npkphonskaplus15151525kg': npkPhonskaPlus15151525kgImage,
    'kapurpertaniankebomas50kg': kapurPertanianKebomas50KgImage,
    'ureanitrea46n50kg': sawitprologoImage,
    'sp26petro25kg': sawitprologoImage,
    'petrozaplus50kg': sawitprologoImage,
    'doktersawitkonsultasi': sawitprologoImage,
    'kunjunganagronomis': sawitprologoImage,
    'minyakkorengharumas1liter': sawitprologoImage,
    'dolomitem10050kg': dolomiteM10050kgImage,
    'npkmutiara16161650kg': npkMutiara16161650kgImage,
    'ureapusrins5050kg': sawitprologoImage,
    'mopkclcanadacapmahkota50kg': pupukMopKclCanadaCapMahkota50KgImage,
    'tspchinacapdaun50kg': tspChinaCapDaun50kgImage
};

    const selectedImage = imageMap[nameKey] || sawitprologoImage; // Default to sawitpro logo image
    console.log('Selected image:', selectedImage === sawitprologoImage ? 'Default (Sawitpro Logo)' : 'Mapped');

    return selectedImage;
};

export const ProductProvider = ({ children }) => {
    // REMOVE HARDCODED DATA - Use state for database products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    // FETCH PRODUCTS FROM DATABASE
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Starting to fetch products from:', `${API_BASE_URL}/api/products`);
                setLoading(true);
                
                const response = await fetch(`${API_BASE_URL}/api/products`);
                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const productsData = await response.json();
                console.log('Raw products data:', productsData);
                console.log('Number of products:', productsData.length);
                
                // Transform database products to match frontend format
                const transformedProducts = productsData.map((product, index) => {
                    console.log(`Processing product ${index + 1}:`, product.name);
                    return {
                        product_id: product.id.toString(),
                        id: product.id,
                        sku: product.sku,
                        type: product.type,
                        name: product.name,
                        unit_of_measurement: product.unit_of_measurement,
                        price: parseFloat(product.price),
                        description: product.description || "No description available",
                        rating: 4.5, // Default rating
                        image: getProductImage(product.name, product.sku), // Dynamic image mapping
                    };
                });
                
                console.log('Transformed products:', transformedProducts);
                setProducts(transformedProducts);
                setError(null);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(`Failed to load products: ${err.message}`);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart(prev => [...prev, product]);
    };

    const addToRecentActivity = (product) => {
        setRecentActivity(prev => [product, ...prev]);
    };

    // Get product by ID from database products
    const getProductById = (id) => {
        return products.find(product => 
            product.product_id === id.toString() || 
            product.id === parseInt(id)
        );
    };

    return (
        <ProductContext.Provider value={{ 
            products, // from database, not hardcoded
            loading,
            error,
            cart,
            addToCart,
            recentActivity,
            addToRecentActivity,
            getProductById
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};