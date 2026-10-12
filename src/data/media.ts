/**
 * Every audio / video reference below points at the media already published on the
 * original Squarespace site. To move the files elsewhere, change the host here, or
 * replace `src` with a local `/media/...` path: no component needs touching.
 */
const AUDIO = 'https://static1.squarespace.com/static/64f5ce5042f4cd471b425694/t';
const VIDEO = 'https://video.squarespace-cdn.com/content/v1/64f5ce5042f4cd471b425694';

export interface Track {
  /** Short name shown as the title. */
  name: string;
  /** Tone descriptor shown under the title (showreels only). */
  tone?: string;
  /** Length in ms, from the original player metadata. */
  durationMs: number;
  src: string;
}

export type Language = 'English' | 'Bulgarian' | 'Italian';

const a = (path: string) => `${AUDIO}/${path}`;

/** The three reels featured in the homepage hero. */
export const heroReels: Track[] = [
  { name: 'Character Mashup Reel English', durationMs: 145000, src: a('6825e17b05072c434482986b/1747313025926/%5BENG%5D+Character+Reel+-+Ray+Rodrigues+-+Compilation.mp3') },
  { name: 'Commercials & Ads Reel English', durationMs: 41000, src: a('6825e219dd129e03be1d1398/1747313179771/%5BENG%5D+Commercial+-+Ray+Rodrigues+-+Compilation.mp3') },
  { name: 'Movie & TV Show Trailers Reel English', durationMs: 48000, src: a('6825e2306d2fdf56edfd52f5/1747313203841/%5BENG%5D+Movie+Trailers+-+Ray+Rodrigues+-+Compilation.mp3') },
];

export interface Showreel {
  language: Language;
  /** Anchor id. */
  id: string;
  heading: string;
  downloadAll: { label: string; href: string };
  tracks: Track[];
}

export const showreels: Showreel[] = [
  {
    language: 'English',
    id: 'english',
    heading: 'English Showreels',
    downloadAll: {
      label: 'download all (English)',
      href: 'https://static1.squarespace.com/static/64f5ce5042f4cd471b425694/t/68275f63ee23ab114e211037/1747410811570/Ray+Rodrigues+English+VO+Showreels+Complete.zip',
    },
    tracks: [
      { name: 'Character Reel', tone: 'Over-The-Top, Energetic', durationMs: 145000, src: a('68276c5a190b577976090a71/1747414117445/%5BENG%5D+Character+Reel+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Commercial Demo', tone: 'Bold, Persuasive', durationMs: 41000, src: a('68276e85190b577976098875/1747414664257/%5BENG%5D+Commercial+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Documentary Demo', tone: 'Warm, Informative', durationMs: 59000, src: a('68276e973ef9ce3aebd240ba/1747414683040/%5BENG%5D+Documentary+-+Ray+Rodrigues+-+Compilation.wav.mp3') },
      { name: 'E-Learning Demo', tone: 'Clear, Friendly', durationMs: 42000, src: a('68276ea9348a972733691d9b/1747414703973/%5BENG%5D+E-learning+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Meditation Demo', tone: 'Soothing, Relaxing', durationMs: 54000, src: a('68276ebb190b57797609944b/1747414719105/%5BENG%5D+Meditation+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'IVR On-Hold Demo', tone: 'Calm, Professional', durationMs: 47000, src: a('68276ec836d27f47ae7eeb1b/1747414731976/%5BENG%5D+IVR+%26+On-Message+holding++-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Theme Park Demo', tone: 'Fun, Vibrant', durationMs: 57000, src: a('68276ed58fe8845aef49a9f5/1747414745245/%5BENG%5D+Theme+Park+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Esports Caster Demo', tone: 'Energetic, Exciting', durationMs: 36000, src: a('68276ee83ff7176fdf08a143/1747414763264/%5BENG%5D+E-sports+-+Ray+Rodrigues+-+Compilation.mp3') },
    ],
  },
  {
    language: 'Bulgarian',
    id: 'bulgarian',
    heading: 'Bulgarian Showreels',
    downloadAll: {
      label: 'download all (Bulgarian)',
      href: 'https://static1.squarespace.com/static/64f5ce5042f4cd471b425694/t/68275f3301ab8a0184a228c2/1747410764999/Ray+Rodrigues+Bulgarian+VO+Showreels+Complete.zip',
    },
    tracks: [
      { name: 'Character Reel', tone: 'Over-The-Top, Energetic', durationMs: 143000, src: a('68276aadb6f23c110fccfe43/1747413684893/%5BBUL%5D+Character+Reel+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Commercial Demo', tone: 'Bold, Persuasive', durationMs: 43000, src: a('68276b147f89c702db33854a/1747413783912/%5BBUL%5D+Commercial+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Documentary Demo', tone: 'Warm, Informative', durationMs: 57000, src: a('68276bc5b51af6687a63e384/1747413961019/%5BBUL%5D+Documentary+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'E-Learning Demo', tone: 'Clear, Friendly', durationMs: 45000, src: a('68276be0b9b7ec2ccc247426/1747413987529/%5BBUL%5D+E-learning+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Meditation Demo', tone: 'Soothing, Relaxing', durationMs: 65000, src: a('68276bf3de3f3b6b379bfa3e/1747414007230/%5BBUL%5D+Meditation+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'IVR On-Hold Demo', tone: 'Calm, Professional', durationMs: 44000, src: a('68276c04e01f1d0c81e0fb14/1747414023403/%5BBUL%5D+IVR+%26+On-Message+Holding+-+Ray+Rodrigues+-+Compilationfinal.mp3') },
      { name: 'Theme Park Demo', tone: 'Fun, Vibrant', durationMs: 63000, src: a('68276c17048b245d349d8f67/1747414043312/%5BBUL%5D+Theme+Park+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Esports Caster Demo', tone: 'Energetic, Fast-paced', durationMs: 32000, src: a('68276c2b709f2118b4ac7117/1747414062644/%5BBUL%5D+E-sports+-+Ray+Rodrigues+-+Compilation.mp3') },
    ],
  },
  {
    language: 'Italian',
    id: 'italian',
    heading: 'Italian Showreels',
    downloadAll: {
      label: 'download all (Italian)',
      href: 'https://static1.squarespace.com/static/64f5ce5042f4cd471b425694/t/68275f88f68bcf1fe0959d28/1747410845540/Ray+Rodrigues+Italian+VO+Showreels+Complete.zip',
    },
    tracks: [
      { name: 'Character Reel', tone: 'Over-The-Top, Energetic', durationMs: 148000, src: a('68276f06b6f23c110fcdf547/1747414797088/%5BITA%5D+Character+Reel+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Commercial Demo', tone: 'Bold, Persuasive', durationMs: 47000, src: a('68276f22e2d7c556714d95db/1747414821711/%5BITA%5D+Commercial+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Documentary Demo', tone: 'Warm, Informative', durationMs: 58000, src: a('68276f2fcefa6b1dca8f35b6/1747414835018/%5BITA%5D+Documentary+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'E-Learning Demo', tone: 'Clear, Friendly', durationMs: 45000, src: a('68276f3e8fe8845aef49ba97/1747414849921/%5BITA%5D+E-learning+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Meditation Demo', tone: 'Soothing, Relaxing', durationMs: 65000, src: a('68276f4a8d0532204fdafb2d/1747414862871/%5BITA%5D+Meditation+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'IVR On-Hold Demo', tone: 'Calm, Professional', durationMs: 42000, src: a('68276f6480a41703de7e9bae/1747414887240/%5BITA%5D+IVR+%26+On-Message+holding+++-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Theme Park Demo', tone: 'Fun, Vibrant', durationMs: 65000, src: a('68276f7180d1e335ba4b701e/1747414901388/%5BITA%5D+Theme+Park+-+Ray+Rodrigues+-+Compilation.mp3') },
      { name: 'Esports Caster Demo', tone: 'Energetic, Exciting', durationMs: 37000, src: a('68276f80a6182374b0e82107/1747414915388/%5BITA%5D+E-sports+-+Ray+Rodrigues+-+Compilation.mp3') },
    ],
  },
];

export interface Audiobooks {
  language: Language;
  id: string;
  heading: string;
  downloadAll: { label: string; href: string };
  tracks: Track[];
}

export const audiobooks: Audiobooks[] = [
  {
    language: 'English',
    id: 'audiobooks-english',
    heading: 'English Audiobooks',
    // The original link (/s/Ray-English-Audiobooks-…zip) already returns 404 on the live site.
    downloadAll: { label: 'Download All', href: 'https://www.thatsraysvoice.com/s/Ray-English-Audiobooks-20250207T082755Z-001.zip' },
    tracks: [
      { name: 'The Domination Of Intellect', durationMs: 70000, src: a('682769c3f9779273bb09119a/1694168258587/domination+of+intellect.mp3') },
      { name: 'Greek Story', durationMs: 75000, src: a('682769c3f9779273bb09119c/1694168278174/Greek+Story.mp3') },
      { name: 'Fixing It For Freddie', durationMs: 44000, src: a('682769c3f9779273bb09119e/1694168298300/Happiness+suffused.mp3') },
      { name: 'How To Concentrate', durationMs: 39000, src: a('682769c3f9779273bb0911a0/1694168343624/How+to+concentrate.mp3') },
    ],
  },
  {
    language: 'Bulgarian',
    id: 'audiobooks-bulgarian',
    heading: 'Bulgarian Audiobooks',
    // The original link (/s/Ray-Bulgarian-Audiobooks-…zip) already returns 404 on the live site.
    downloadAll: { label: 'Download All', href: 'https://www.thatsraysvoice.com/s/Ray-Bulgarian-Audiobooks-20250207T082756Z-001.zip' },
    tracks: [
      { name: 'Harmless Flirting', durationMs: 35000, src: a('682769c3f9779273bb091192/1694168187626/Harmless-flirting.mp3') },
      { name: 'Ready Player One', durationMs: 82000, src: a('682769c3f9779273bb091194/1694168203186/ready-player-one.mp3') },
      { name: 'Scarloy The Engine', durationMs: 75000, src: a('682769c3f9779273bb091196/1694168224681/Scarloy-the-engine.mp3') },
      { name: 'Worm Composting', durationMs: 98000, src: a('682769c3f9779273bb091198/1694168240128/Worm-composting.mp3') },
    ],
  },
  {
    language: 'Italian',
    id: 'audiobooks-italian',
    heading: 'Italian Audiobooks',
    downloadAll: {
      label: 'Download All',
      href: 'https://static1.squarespace.com/static/64f5ce5042f4cd471b425694/t/67a5c4530d91b626c40cfcc2/1738916970029/Ray+Italian+Audiobooks-20250207T082754Z-001.zip',
    },
    tracks: [
      { name: 'Beauty And The Beast', durationMs: 76000, src: a('682769c3f9779273bb0911a2/1694168378483/Beauty+and+the+beast.mp3') },
      { name: 'Harry Houdini', durationMs: 35000, src: a('682769c3f9779273bb0911a4/1694168398306/Harry+Houdini.mp3') },
      { name: 'Lady Of Secrets', durationMs: 79000, src: a('682769c3f9779273bb0911a6/1694168414500/Henrietta+new+york+1861.mp3') },
      { name: 'Avvenimento ad Owl Creak', durationMs: 82000, src: a('682769c3f9779273bb0911a8/1694168438268/Occorrenza+ad+Owl+Creak.mp3') },
    ],
  },
];

export interface DominosVideo {
  /** Squarespace video id: playlist = `${VIDEO}/${id}/playlist.m3u8`. */
  id: string;
  durationSeconds: number;
}

/** In the order the tiles appear on the original page (reading left-to-right, top-to-bottom). */
export const dominosVideos: DominosVideo[] = [
  { id: '922644e1-256d-46ed-875b-ac2de5dc925c', durationSeconds: 40.87 },
  { id: '9467d683-2042-4305-adcc-2aa11d71fafa', durationSeconds: 80.16 },
  { id: 'e590dec2-67b8-4d34-a6a6-3af3ba5eb138', durationSeconds: 33.83 },
  { id: 'f68e1b54-9f88-4f93-9fa5-968d1a69d049', durationSeconds: 28.21 },
  { id: '520de2ad-bc71-49b4-8ff1-71c9f88b1e20', durationSeconds: 26.54 },
  { id: 'd2798155-c4bd-46df-ab33-4da723a9762d', durationSeconds: 28.5 },
];

export const videoPlaylist = (id: string) => `${VIDEO}/${id}/playlist.m3u8`;
