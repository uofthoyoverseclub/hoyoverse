import { Mail, Linkedin, Twitter } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  email: string;
  linkedin?: string;
  twitter?: string;
  type: 'exec' | 'associate';
  // For execs
  bio?: string;
  // For associates
  campus?: string;
  study?: string;
  year?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Mashal Nihal',
    role: 'President',
    bio: "Supreme Alpha Leader, Head Fujoshi, Edgy Anemo Teen Girl.",
    image: '/Mashal.jpg',
    email: '#',
    linkedin: '#',
    twitter: '#',
    type: 'exec',
  },
  {
    id: 2,
    name: 'Daniel Tung',
    role: 'Vice President',
    bio: "Chronically online banana, gacha crazed cosplayer. Got randomly picked up (kidnapped) at UTM CCT one random evening and was deemed worthy of a leadership position. I try my best to attend anything and everything which happens  in the club. If you ever see me, say 'Banana', and I'll know you're a real one frfr.",
    image: '/Daniel.png',
    email: '',
    linkedin: '#',
    type: 'exec',
  },
  {
    id: 3,
    name: 'Aaron Li',
    role: 'Vice President of Internal Affairs, Vice President of Web Development',
    bio: 'Hi all! My name is Aaron, and I am one of the 5 original Execs of this club. I have lost 80% of my 50/50s across the 3 main hoyoverse games, and I used to be the number one chatter in the discord server. Other than that, I have a top 1% Flins and Arlechinno. Nice to meet all of you :). ',
    image: '/Aaron.png',
    email: '',
    linkedin: '#',
    twitter: '#',
    type: 'exec',
  },
  {
    id: 4,
    name: 'Cynthia Wu',
    role: 'Outreach Associate, Finance Associate',
    campus: 'St. George',
    study: 'Accounting',
    year: '2nd Year',
    image: '/Mon.jpg',
    email: '',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 5,
    name: 'Caravthir Le',
    role: 'Photography Associate',
    campus: 'Mississauga',
    study: 'Accounting',
    year: '2nd Year',
    image: '/Cara.jpg',
    email: 'jessica@clubname.com',
    twitter: '#',
    type: 'associate',
  },
  {
    id: 6,
    name: 'Hai Shi',
    role: 'Online Events Associate',
    campus: 'St. George',
    study: 'Computer Science',
    year: '4th Year',
    image: '/Seucha.png',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 7,
    name: 'Alexandra Ovsiankine',
    role: 'Vice President of Events',
    bio: 'Hello!!! I love cosplaying and attending conventions, plus helping out at hoyo club to make sure all events run smoothly ^^ I’m always searching for new merch to add to my art wall and redecorate my ita bags. I’ve breathed in more hairspray than is probably healthy…',
    image: '/Lia.jpg',
    email: '',
    linkedin: '#',
    twitter: '#',
    type: 'exec',
  },
  {
    id: 8,
    name: 'Vivian F. Torres',
    role: 'Vice President of Finance',
    bio: "Vivian, Vivi, Vi, Viv; I'm a gal of many names. I like skirts, matcha, prosekai, alien stage, and webtoons. You can find me either chatting in the discord or at the UTM meetings. I work behind the scenes on keeping track of our finances. If you're reading this, keep your receipts or else.",
    image: '/vivi.jpg',
    email: '',
    linkedin: '#',
    twitter: '#',
    type: 'exec',
  },
  {
    id: 9,
    name: 'Meg Bernardo',
    role: 'Social Media Associate',
    campus: 'Mississauga',
    study: 'Philosophy',
    year: '2nd Year',
    image: '/Meg.jpg',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 10,
    name: 'Belinda Zhou',
    role: 'Events Associate',
    campus: 'St. George',
    study: 'Physiology and Biomedical Toxicology',
    year: '2nd Year',
    image: '/Bel.jpg',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 11,
    name: 'Dawson Bartfay',
    role: 'Head of Scarborough Operations',
    campus: 'Scarborough',
    study: 'Economics',
    year: '3rd Year',
    image: '/Dawson.jpg',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 12,
    name: 'Dennis Duong',
    role: 'Event Associate',
    campus: 'Scarborough',
    study: 'International Business',
    year: '3rd Year',
    image: '/Dennis.jpg',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 13,
    name: 'Kris',
    role: 'Social Media Associate',
    campus: 'Mississauga',
    study: 'Applied Mathematics and Statistics',
    year: '3rd Year',
    image: '/Kris.png',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 14,
    name: 'Mandy Han',
    role: 'Social Media Associate',
    campus: 'Mississauga',
    study: 'Computer Science and Mathematics',
    year: '1st Year',
    image: '/Mandy.png',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 15,
    name: 'Joshua B',
    role: 'Events Associate',
    campus: 'Mississauga',
    study: 'Physical and Chemical Sciences',
    year: '1st Year',
    image: '/Meep.png',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 16,
    name: 'Zagreus Zheng',
    role: 'Events Associate',
    campus: 'St. George',
    study: 'Political Science',
    year: '2nd Year',
    image: '/zag.png',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 17,
    name: 'Eric Xia',
    role: 'Vice President of Outreach',
    bio: "Hiii I'm Eric, or wctl on discord, or @lychoruss on instagram (I go by many names) and I do a ton of stuff for the club. In addition to my exec duties, I also cosplay, run our group music projects, and just generally exist in the club spaces at (almost) all times.",
    image: '/Eric.JPG',
    email: '',
    linkedin: '#',
    twitter: '#',
    type: 'exec',
  },
  {
    id: 17,
    name: 'Aryanna',
    role: 'Artist Associate',
    campus: 'Mississauga',
    study: 'Psychology',
    year: '1st Year',
    image: '/Ayu.jpg',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 18,
    name: 'Anish Roy',
    role: "Tech Associate and Aaron's Minion",
    campus: 'Mississauga',
    study: 'Computer Science and Mathematics',
    year: '3rd Year',
    image: '/Anish.jpg',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 18,
    name: 'Stanley Wong',
    role: 'Piece of Furniture',
    campus: 'Mississauga',
    study: 'Technology, Coding and Society',
    year: '2nd Year',
    image: '/Swog.jpg',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 19,
    name: 'Yung-Chi Liu',
    role: 'Videographer/Photographer Associate',
    campus: 'St. George',
    study: 'Architectural Design',
    year: '3rd Year',
    image: '/Melody.jpg',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 20,
    name: 'Kayla C',
    role: 'Social Media Associate',
    campus: 'Mississauga',
    study: 'Commerce',
    year: '1st Year',
    image: '/KAyla.jpg',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 21,
    name: 'Azure Galarza',
    role: 'Cosplay Associate',
    campus: 'Mississauga',
    study: 'Forensic Science',
    year: '1st Year',
    image: '/Azure.png',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 22,
    name: 'Erika Chen',
    role: 'Social Media Associate',
    campus: 'St. George',
    study: 'Life Sciences',
    year: '1st Year',
    image: '/erika.png',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 21,
    name: 'Troy Tu',
    role: 'Photography Associate',
    campus: 'St. George',
    study: 'Physics',
    year: '2nd Year',
    image: '/Troy.jpg',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },

  {
    id: 22,
    name: 'Emma',
    role: 'Photography Associate',
    campus: 'Scarborough',
    study: 'Sociology ',
    year: '3rd Year',
    image: '/Emma.png',
    email: '#',
    linkedin: '#',
    type: 'associate',
  },
];

export function Team() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative text-white py-30 bg-center"
        style={{
          backgroundImage: "url('/flins%20lauma.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6">Our Team</h1>
            <p className="text-xl text-white/90">
              Meet the wonderful team of execs and associates who make this club possible!
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Executive Team */}
          <div className="mb-16">
            <h2 className="text-4xl mb-8 text-center" style={{ color: '#a8dadc' }}>Executive Team</h2>
            <div className="space-y-6">
              {teamMembers.filter(member => member.type === 'exec').map((member) => (
                <div
                  key={member.id}
                  className="rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row"
                  style={{ backgroundColor: '#006494' }}
                >
                  <div className="md:w-64 md:h-64 w-full h-48 flex-shrink-0 overflow-hidden" style={{ backgroundColor: '#1d3557' }}>
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={member.name === 'Alexandra Ovsiankine' ? { objectPosition: 'center 30%' } : {}}
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-2xl mb-1 text-white">{member.name}</h3>
                    <p className="mb-3 text-lg" style={{ color: '#a8dadc' }}>{member.role}</p>
                    <p style={{ color: '#a8dadc' }}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Associates */}
          <div>
            <h2 className="text-4xl mb-8 text-center" style={{ color: '#a8dadc' }}>Associates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.filter(member => member.type === 'associate').map((member) => (
                <div
                  key={member.id}
                  className="rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  style={{ backgroundColor: '#006494' }}
                >
                  <div className="aspect-square overflow-hidden" style={{ backgroundColor: '#1d3557' }}>
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={member.name === 'Meg Bernardo' || member.name === 'Hai Shi' ? { objectPosition: 'center 20%' } : {}}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-1 text-white">{member.name}</h3>
                    <p className="mb-3" style={{ color: '#a8dadc' }}>{member.role}</p>
                    
                    <div className="space-y-1 mb-4">
                      {member.campus && (
                        <p className="text-sm" style={{ color: '#a8dadc' }}>
                          <span className="font-semibold">Campus:</span> {member.campus}
                        </p>
                      )}
                      {member.study && (
                        <p className="text-sm" style={{ color: '#a8dadc' }}>
                          <span className="font-semibold">Study:</span> {member.study}
                        </p>
                      )}
                      {member.year && (
                        <p className="text-sm" style={{ color: '#a8dadc' }}>
                          <span className="font-semibold">Year:</span> {member.year}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4" style={{ color: '#a8dadc' }}>Want to Join Our Team?</h2>
          <p className="text-xl mb-8" style={{ color: '#a8dadc' }}>
            We're always looking for passionate individuals to help us grow our community. Applications open at the beginning of each semester. Join our discord to stay updated on team recruitment!
          </p>
          <a
            href="/join"
            className="text-white px-8 py-3 rounded-lg transition-colors inline-block"
            style={{ backgroundColor: '#006494' }}
          >
            Join Discord
          </a>
        </div>
      </section>
    </div>
  );
}
