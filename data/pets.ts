export interface CurrentPet {
    id: string
    name: string
    type: 'cat' | 'dog'
    breed: string
    age?: string
    status: 'resident' | 'boarding'
    personality: string[]
    favoriteActivities: string[]
    image: string
    joinedDate: string
}

export const currentPets: CurrentPet[] = [
    // Cats
    {
        id: 'cat-1',
        name: 'Bibi',
        type: 'cat',
        breed: 'Munchkin Silver Shaded',
        status: 'resident',
        personality: ['Playful', 'Curious', 'Affectionate'],
        favoriteActivities: ['Chasing toys', 'Sunbathing', 'Cuddles'],
        image: '/pets/bibi.jpg',
        joinedDate: '2022-01-15'
    },
    {
        id: 'cat-2',
        name: 'Dudu',
        type: 'cat',
        breed: 'British Shorthair Golden',
        status: 'resident',
        personality: ['Gentle', 'Calm', 'Friendly'],
        favoriteActivities: ['Napping', 'Bird watching', 'Treats'],
        image: '/pets/dudu.jpg',
        joinedDate: '2022-03-20'
    },
    {
        id: 'cat-3',
        name: 'Fifi',
        type: 'cat',
        breed: 'Golden British Shorthair',
        age: '3 months',
        status: 'boarding',
        personality: ['Energetic', 'Playful', 'Adorable'],
        favoriteActivities: ['Playing with feathers', 'Exploring', 'Milk time'],
        image: '/pets/fifi.jpg',
        joinedDate: '2024-09-01'
    },
    {
        id: 'cat-4',
        name: 'Meimei',
        type: 'cat',
        breed: 'Ragdoll',
        status: 'boarding',
        personality: ['Sweet', 'Docile', 'Loving'],
        favoriteActivities: ['Being held', 'Grooming', 'Quiet play'],
        image: '/pets/meimei.jpg',
        joinedDate: '2024-06-15'
    },
    {
        id: 'cat-5',
        name: 'Neon',
        type: 'cat',
        breed: 'Ragdoll',
        status: 'boarding',
        personality: ['Independent', 'Elegant', 'Observant'],
        favoriteActivities: ['High perches', 'Solo play', 'Window watching'],
        image: '/pets/neon.jpg',
        joinedDate: '2024-07-20'
    },
    {
        id: 'cat-6',
        name: 'Xiabao',
        type: 'cat',
        breed: 'Ragdoll',
        status: 'boarding',
        personality: ['Playful', 'Social', 'Gentle'],
        favoriteActivities: ['Group play', 'Feather wands', 'Treats'],
        image: '/pets/xiabao.jpg',
        joinedDate: '2024-08-10'
    },
    {
        id: 'cat-7',
        name: 'Mia',
        type: 'cat',
        breed: 'Ragdoll',
        status: 'boarding',
        personality: ['Affectionate', 'Quiet', 'Sweet'],
        favoriteActivities: ['Lap sitting', 'Soft toys', 'Gentle pets'],
        image: '/pets/mia-cat.jpg',
        joinedDate: '2024-08-25'
    },
    {
        id: 'cat-8',
        name: 'Tutu',
        type: 'cat',
        breed: 'Siamese',
        status: 'boarding',
        personality: ['Vocal', 'Active', 'Intelligent'],
        favoriteActivities: ['Talking', 'Puzzle toys', 'Climbing'],
        image: '/pets/tutu.jpg',
        joinedDate: '2024-09-05'
    },
    {
        id: 'cat-9',
        name: 'Xianbei',
        type: 'cat',
        breed: 'Silver Shaded',
        status: 'boarding',
        personality: ['Calm', 'Dignified', 'Observant'],
        favoriteActivities: ['Quiet spaces', 'Grooming', 'Watching others'],
        image: '/pets/xianbei.jpg',
        joinedDate: '2024-09-10'
    },
    {
        id: 'cat-10',
        name: 'Chacha',
        type: 'cat',
        breed: 'Silver Shaded',
        status: 'boarding',
        personality: ['Friendly', 'Curious', 'Adaptable'],
        favoriteActivities: ['Exploring', 'Making friends', 'Cat TV'],
        image: '/pets/chacha.jpg',
        joinedDate: '2024-09-15'
    },
    {
        id: 'cat-11',
        name: 'Yaya',
        type: 'cat',
        breed: 'Black Cat',
        status: 'boarding',
        personality: ['Mysterious', 'Playful', 'Loyal'],
        favoriteActivities: ['Night play', 'Hide and seek', 'String toys'],
        image: '/pets/yaya.jpg',
        joinedDate: '2024-09-20'
    },
    {
        id: 'cat-12',
        name: 'Er Gou',
        type: 'cat',
        breed: 'Tuxedo Cat',
        status: 'boarding',
        personality: ['Mischievous', 'Energetic', 'Loving'],
        favoriteActivities: ['Running', 'Playing with balls', 'Attention'],
        image: '/pets/ergou.jpg',
        joinedDate: '2024-09-25'
    },
    {
        id: 'cat-13',
        name: 'Chouchou',
        type: 'cat',
        breed: 'Orange Tabby',
        status: 'boarding',
        personality: ['Laid-back', 'Food-loving', 'Cuddly'],
        favoriteActivities: ['Eating', 'Sleeping', 'Belly rubs'],
        image: '/pets/chouchou.jpg',
        joinedDate: '2024-10-01'
    },
    // Dogs
    {
        id: 'dog-1',
        name: 'Oscar',
        type: 'dog',
        breed: 'Golden Retriever',
        age: '4 months',
        status: 'boarding',
        personality: ['Puppy Energy', 'Friendly', 'Eager to Learn'],
        favoriteActivities: ['Fetch', 'Puppy play', 'Training treats'],
        image: '/pets/oscar.jpg',
        joinedDate: '2024-09-01'
    },
    {
        id: 'dog-2',
        name: 'Loki',
        type: 'dog',
        breed: 'Greyhound',
        status: 'boarding',
        personality: ['Fast', 'Gentle', 'Calm Indoors'],
        favoriteActivities: ['Running', 'Couch lounging', 'Gentle walks'],
        image: '/pets/loki.jpg',
        joinedDate: '2024-07-15'
    },
    {
        id: 'dog-3',
        name: 'Nana',
        type: 'dog',
        breed: 'Border Collie',
        status: 'boarding',
        personality: ['Intelligent', 'Active', 'Herding Instinct'],
        favoriteActivities: ['Agility', 'Frisbee', 'Problem solving'],
        image: '/pets/nana.jpg',
        joinedDate: '2024-08-01'
    },
    {
        id: 'dog-4',
        name: 'Richard',
        type: 'dog',
        breed: 'Border Collie',
        status: 'boarding',
        personality: ['Smart', 'Energetic', 'Focused'],
        favoriteActivities: ['Training', 'Ball games', 'Running'],
        image: '/pets/richard.jpg',
        joinedDate: '2024-08-10'
    },
    {
        id: 'dog-5',
        name: 'Tata',
        type: 'dog',
        breed: 'Border Collie',
        status: 'boarding',
        personality: ['Playful', 'Alert', 'Loyal'],
        favoriteActivities: ['Herding games', 'Tricks', 'Long walks'],
        image: '/pets/tata.jpg',
        joinedDate: '2024-08-20'
    },
    {
        id: 'dog-6',
        name: 'Caicai',
        type: 'dog',
        breed: 'Shiba Inu',
        status: 'boarding',
        personality: ['Independent', 'Alert', 'Spirited'],
        favoriteActivities: ['Exploring', 'Tug of war', 'Puzzle toys'],
        image: '/pets/caicai.jpg',
        joinedDate: '2024-09-05'
    },
    {
        id: 'dog-7',
        name: 'Mia',
        type: 'dog',
        breed: 'American Cocker Spaniel',
        status: 'boarding',
        personality: ['Gentle', 'Happy', 'Affectionate'],
        favoriteActivities: ['Grooming', 'Gentle play', 'Cuddles'],
        image: '/pets/mia-dog.jpg',
        joinedDate: '2024-09-12'
    },
    {
        id: 'dog-8',
        name: 'Nova',
        type: 'dog',
        breed: 'Golden Retriever',
        status: 'boarding',
        personality: ['Friendly', 'Patient', 'Loving'],
        favoriteActivities: ['Swimming', 'Fetch', 'Meeting friends'],
        image: '/pets/nova.jpg',
        joinedDate: '2024-09-18'
    }
]