import * as THREE from 'three';

// ==========================================
// マップ定義（マテリアル種別・建築演出対応）
// ==========================================
const MAPS = {
  arena: {
    id: 'arena',
    name: 'クラシックアリーナ',
    size: 40,
    bgColor: 0x0b1220,
    fogColor: 0x0f172a,
    skyColors: ['#091224', '#162844', '#2a4162'],
    floorType: 'arena',
    ambientIntensity: 0.62,
    sunColor: 0xfff5e4,
    sunIntensity: 1.35,
    rimColor: 0x60a5fa,
    rimIntensity: 0.45,
    obstacles: [
      { x: 0, y: 2.5, z: -20, w: 40, h: 5, d: 1, color: 0x64748b, matType: 'wallLong' },
      { x: 0, y: 2.5, z: 20, w: 40, h: 5, d: 1, color: 0x64748b, matType: 'wallLong' },
      { x: -20, y: 2.5, z: 0, w: 1, h: 5, d: 40, color: 0x64748b, matType: 'wallLong' },
      { x: 20, y: 2.5, z: 0, w: 1, h: 5, d: 40, color: 0x64748b, matType: 'wallLong' },
      { x: 0, y: 1.5, z: 0, w: 4, h: 3, d: 4, color: 0x64748b, matType: 'metal' },
      { x: -8, y: 1.25, z: -8, w: 3, h: 2.5, d: 3, color: 0x94a3b8, matType: 'concrete' },
      { x: 8, y: 1.25, z: -8, w: 3, h: 2.5, d: 3, color: 0x94a3b8, matType: 'concrete' },
      { x: -8, y: 1.25, z: 8, w: 3, h: 2.5, d: 3, color: 0x94a3b8, matType: 'concrete' },
      { x: 8, y: 1.25, z: 8, w: 3, h: 2.5, d: 3, color: 0x94a3b8, matType: 'concrete' },
      { x: 0, y: 0.75, z: -11, w: 6, h: 1.5, d: 1.5, color: 0xd97706, matType: 'hazard' },
      { x: 0, y: 0.75, z: 11, w: 6, h: 1.5, d: 1.5, color: 0xd97706, matType: 'hazard' },
      { x: -11, y: 0.75, z: 0, w: 1.5, h: 1.5, d: 6, color: 0xd97706, matType: 'hazard' },
      { x: 11, y: 0.75, z: 0, w: 1.5, h: 1.5, d: 6, color: 0xd97706, matType: 'hazard' }
    ],
    spawns: [
      { x: -15, y: 0, z: -15 },
      { x: 15, y: 0, z: -15 },
      { x: -15, y: 0, z: 15 },
      { x: 15, y: 0, z: 15 },
      { x: 0, y: 0, z: -16 },
      { x: 0, y: 0, z: 16 },
      { x: -16, y: 0, z: 0 },
      { x: 16, y: 0, z: 0 }
    ],
    pickupSpawns: [
      { x: 0, y: 0, z: -6.5 },
      { x: 0, y: 0, z: 6.5 },
      { x: -14, y: 0, z: 0 },
      { x: 14, y: 0, z: 0 }
    ]
  },

  warehouse: {
    id: 'warehouse',
    name: 'コンテナ倉庫',
    size: 48,
    bgColor: 0x161412,
    fogColor: 0x1c1917,
    skyColors: ['#141210', '#29241f', '#433b33'],
    floorType: 'warehouse',
    ambientIntensity: 0.58,
    sunColor: 0xffe4c4,
    sunIntensity: 1.4,
    rimColor: 0xf59e0b,
    rimIntensity: 0.4,
    obstacles: [
      { x: 0, y: 3, z: -24, w: 48, h: 6, d: 1, color: 0x57534e, matType: 'wallLong' },
      { x: 0, y: 3, z: 24, w: 48, h: 6, d: 1, color: 0x57534e, matType: 'wallLong' },
      { x: -24, y: 3, z: 0, w: 1, h: 6, d: 48, color: 0x57534e, matType: 'wallLong' },
      { x: 24, y: 3, z: 0, w: 1, h: 6, d: 48, color: 0x57534e, matType: 'wallLong' },
      { x: 0, y: 1.0, z: 0, w: 7, h: 2.0, d: 7, color: 0xd97706, matType: 'metal' },
      { x: 0, y: 0.45, z: -5.2, w: 3.2, h: 0.9, d: 3.4, color: 0x78716c, matType: 'concrete' },
      { x: 0, y: 0.45, z: 5.2, w: 3.2, h: 0.9, d: 3.4, color: 0x78716c, matType: 'concrete' },
      { x: -13, y: 1.6, z: -9, w: 3.5, h: 3.2, d: 8.5, color: 0x0f766e, matType: 'container' },
      { x: 13, y: 1.6, z: 9, w: 3.5, h: 3.2, d: 8.5, color: 0x0f766e, matType: 'container' },
      { x: -13, y: 1.6, z: 9, w: 3.5, h: 3.2, d: 8.5, color: 0xb45309, matType: 'container' },
      { x: 13, y: 1.6, z: -9, w: 3.5, h: 3.2, d: 8.5, color: 0xb45309, matType: 'container' },
      { x: -7, y: 0.8, z: -15, w: 4, h: 1.6, d: 2, color: 0xc29b61, matType: 'crate' },
      { x: 7, y: 0.8, z: 15, w: 4, h: 1.6, d: 2, color: 0xc29b61, matType: 'crate' },
      { x: 7, y: 0.8, z: -15, w: 4, h: 1.6, d: 2, color: 0xc29b61, matType: 'crate' },
      { x: -7, y: 0.8, z: 15, w: 4, h: 1.6, d: 2, color: 0xc29b61, matType: 'crate' },
      { x: -19, y: 1.1, z: 0, w: 2.5, h: 2.2, d: 4, color: 0x78716c, matType: 'hazard' },
      { x: 19, y: 1.1, z: 0, w: 2.5, h: 2.2, d: 4, color: 0x78716c, matType: 'hazard' }
    ],
    spawns: [
      { x: -19, y: 0, z: -19 },
      { x: 19, y: 0, z: -19 },
      { x: -19, y: 0, z: 19 },
      { x: 19, y: 0, z: 19 },
      { x: 0, y: 0, z: -20 },
      { x: 0, y: 0, z: 20 },
      { x: -20, y: 0, z: -6 },
      { x: 20, y: 0, z: 6 }
    ],
    pickupSpawns: [
      { x: 0, y: 2.0, z: 0 },
      { x: -17, y: 0, z: 0 },
      { x: 17, y: 0, z: 0 },
      { x: 0, y: 0, z: -12 }
    ]
  },

  cyber: {
    id: 'cyber',
    name: 'サイバータワー',
    size: 44,
    bgColor: 0x060716,
    fogColor: 0x090b22,
    skyColors: ['#040512', '#101238', '#1d1b52'],
    floorType: 'cyber',
    ambientIntensity: 0.65,
    sunColor: 0xe0f2fe,
    sunIntensity: 1.25,
    rimColor: 0xd946ef,
    rimIntensity: 0.6,
    obstacles: [
      { x: 0, y: 3, z: -22, w: 44, h: 6, d: 1, color: 0x312e81, matType: 'wallLong' },
      { x: 0, y: 3, z: 22, w: 44, h: 6, d: 1, color: 0x312e81, matType: 'wallLong' },
      { x: -22, y: 3, z: 0, w: 1, h: 6, d: 44, color: 0x312e81, matType: 'wallLong' },
      { x: 22, y: 3, z: 0, w: 1, h: 6, d: 44, color: 0x312e81, matType: 'wallLong' },
      { x: 0, y: 2.5, z: 0, w: 3.6, h: 5, d: 3.6, color: 0x3730a3, matType: 'cyber' },
      { x: -6, y: 0.75, z: 0, w: 3.5, h: 1.5, d: 3.5, color: 0x0891b2, matType: 'cyber' },
      { x: 6, y: 0.75, z: 0, w: 3.5, h: 1.5, d: 3.5, color: 0x0891b2, matType: 'cyber' },
      { x: 0, y: 0.75, z: -6, w: 3.5, h: 1.5, d: 3.5, color: 0xc026d3, matType: 'cyber' },
      { x: 0, y: 0.75, z: 6, w: 3.5, h: 1.5, d: 3.5, color: 0xc026d3, matType: 'cyber' },
      { x: -10.5, y: 0.4, z: 0, w: 2.5, h: 0.8, d: 2.5, color: 0x2563eb, matType: 'metal' },
      { x: 10.5, y: 0.4, z: 0, w: 2.5, h: 0.8, d: 2.5, color: 0x2563eb, matType: 'metal' },
      { x: -12, y: 2.0, z: -12, w: 2.4, h: 4.0, d: 2.4, color: 0x4f46e5, matType: 'cyber' },
      { x: 12, y: 2.0, z: -12, w: 2.4, h: 4.0, d: 2.4, color: 0x4f46e5, matType: 'cyber' },
      { x: -12, y: 2.0, z: 12, w: 2.4, h: 4.0, d: 2.4, color: 0x4f46e5, matType: 'cyber' },
      { x: 12, y: 2.0, z: 12, w: 2.4, h: 4.0, d: 2.4, color: 0x4f46e5, matType: 'cyber' },
      { x: -7, y: 0.65, z: -15, w: 5, h: 1.3, d: 1.0, color: 0x06b6d4, matType: 'metal' },
      { x: 7, y: 0.65, z: 15, w: 5, h: 1.3, d: 1.0, color: 0x06b6d4, matType: 'metal' },
      { x: 15, y: 0.65, z: -7, w: 1.0, h: 1.3, d: 5, color: 0xd946ef, matType: 'metal' },
      { x: -15, y: 0.65, z: 7, w: 1.0, h: 1.3, d: 5, color: 0xd946ef, matType: 'metal' }
    ],
    spawns: [
      { x: -17, y: 0, z: -17 },
      { x: 17, y: 0, z: -17 },
      { x: -17, y: 0, z: 17 },
      { x: 17, y: 0, z: 17 },
      { x: 0, y: 0, z: -17 },
      { x: 0, y: 0, z: 17 },
      { x: -17, y: 0, z: 0 },
      { x: 17, y: 0, z: 0 }
    ],
    pickupSpawns: [
      { x: -6, y: 1.5, z: 0 },
      { x: 6, y: 1.5, z: 0 },
      { x: 0, y: 0, z: -13 },
      { x: 0, y: 0, z: 13 }
    ]
  }
};

// ==========================================
// 武器定義（腰撃ち・移動・空中・反動パラメータ付き）
// ==========================================
const WEAPON_ORDER = ['ar', 'smg', 'shotgun', 'sniper'];
const WEAPONS = {
  ar: {
    id: 'ar',
    name: 'ASSAULT RIFLE',
    shortName: 'AR',
    auto: true,
    bodyDmg: 24,
    headDmg: 48,
    mag: 30,
    fireRateMs: 120,
    reloadMs: 1400,
    pellets: 1,
    hipSpread: 0.036,
    adsSpread: 0.004,
    moveSpread: 0.032,
    airSpread: 0.075,
    bloomPerShot: 0.007,
    maxBloom: 0.045,
    recoilPitch: 0.009,
    adsFov: 52,
    adsSensMult: 0.6,
    adsMoveMult: 0.65,
    moveMult: 1.0,
    tracerColor: 0xfacc15,
    scoped: false
  },
  smg: {
    id: 'smg',
    name: 'RAPID SMG',
    shortName: 'SMG',
    auto: true,
    bodyDmg: 15,
    headDmg: 30,
    mag: 36,
    fireRateMs: 72,
    reloadMs: 1150,
    pellets: 1,
    hipSpread: 0.046,
    adsSpread: 0.012,
    moveSpread: 0.022,
    airSpread: 0.06,
    bloomPerShot: 0.005,
    maxBloom: 0.042,
    recoilPitch: 0.006,
    adsFov: 58,
    adsSensMult: 0.7,
    adsMoveMult: 0.75,
    moveMult: 1.08,
    tracerColor: 0x38bdf8,
    scoped: false
  },
  shotgun: {
    id: 'shotgun',
    name: 'COMBAT SHOTGUN',
    shortName: 'SG',
    auto: false,
    bodyDmg: 14,
    headDmg: 24,
    mag: 6,
    fireRateMs: 750,
    reloadMs: 1800,
    pellets: 7,
    hipSpread: 0.088,
    adsSpread: 0.052,
    moveSpread: 0.02,
    airSpread: 0.045,
    bloomPerShot: 0.015,
    maxBloom: 0.03,
    recoilPitch: 0.028,
    adsFov: 62,
    adsSensMult: 0.75,
    adsMoveMult: 0.7,
    moveMult: 1.02,
    tracerColor: 0xf97316,
    scoped: false
  },
  sniper: {
    id: 'sniper',
    name: 'BOLT SNIPER',
    shortName: 'SR',
    auto: false,
    bodyDmg: 75,
    headDmg: 150,
    mag: 5,
    fireRateMs: 1150,
    reloadMs: 2100,
    pellets: 1,
    hipSpread: 0.095,
    adsSpread: 0.0,
    moveSpread: 0.065,
    airSpread: 0.11,
    bloomPerShot: 0.02,
    maxBloom: 0.04,
    recoilPitch: 0.042,
    adsFov: 24,
    adsSensMult: 0.35,
    adsMoveMult: 0.52,
    moveMult: 0.94,
    tracerColor: 0xe879f9,
    scoped: true
  }
};

// ==========================================
// ゲームルール定義（4種類）
// ==========================================
const RULES = {
  ffa: {
    id: 'ffa',
    name: 'デスマッチ (FFA)',
    targetKills: 15,
    lockedWeapon: null,
    allowMedkits: true,
    teamMode: false
  },
  tdm: {
    id: 'tdm',
    name: 'チームデスマッチ',
    targetKills: 20,
    lockedWeapon: null,
    allowMedkits: true,
    teamMode: true
  },
  sniper: {
    id: 'sniper',
    name: 'スナイパー一撃戦',
    targetKills: 10,
    lockedWeapon: 'sniper',
    allowMedkits: false,
    teamMode: false
  },
  headshot: {
    id: 'headshot',
    name: 'HS限定戦',
    targetKills: 10,
    lockedWeapon: null,
    allowMedkits: true,
    teamMode: false
  }
};

const AVATAR_STYLES = new Set(['trooper', 'cyber', 'ninja']);
const AVATAR_COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

const PEER_PREFIX = 'fps3d-room-';
const PEER_CONFIG = {
  config: {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  }
};

const EYE_HEIGHT = 1.65;
const CROUCH_EYE_HEIGHT = 1.05;
const SLIDE_EYE_HEIGHT = 0.85;
const BASE_FOV = 75;
const SLIDE_FOV = 86;

const PLAYER_RADIUS = 0.45;
const PLAYER_HEIGHT = 1.9;
const CROUCH_PLAYER_HEIGHT = 1.3;
const SLIDE_PLAYER_HEIGHT = 1.15;

const MOVE_SPEED = 8.5;
const CROUCH_MOVE_MULT = 0.52;
const JUMP_VELOCITY = 7.8;
const GRAVITY = 22.0;

const SLIDE_DURATION = 0.65;
const SLIDE_COOLDOWN = 0.9;
const SLIDE_INITIAL_SPEED = 16.0;
const SLIDE_END_SPEED = 6.5;

const MEDKIT_DURATION_MS = 5000;
const MEDKIT_HEAL_AMOUNT = 40;
const KILL_HEAL_AMOUNT = 35;
const INITIAL_MEDKITS = 2;
const MAX_MEDKITS = 3;
const PICKUP_RESPAWN_MS = 15000;
const RESPAWN_SECONDS = 3;
const MATCH_RESTART_SECONDS = 5;

let currentMapId = 'arena';
let currentRuleId = 'ffa';
let teamScores = { red: 0, blue: 0 };
let matchOver = false;
let matchEndTime = 0;

function getCurrentMap() {
  return MAPS[currentMapId] || MAPS.arena;
}

function getCurrentRule() {
  return RULES[currentRuleId] || RULES.ffa;
}

function getRandomSpawn(mapId = currentMapId) {
  const map = MAPS[mapId] || MAPS.arena;
  const sp = map.spawns[Math.floor(Math.random() * map.spawns.length)];
  return { x: sp.x, y: sp.y, z: sp.z };
}

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function parseColorNum(hexOrNum) {
  if (typeof hexOrNum === 'number') return hexOrNum;
  const s = String(hexOrNum || '#3b82f6').replace('#', '');
  const n = parseInt(s, 16);
  return Number.isNaN(n) ? 0x3b82f6 : n;
}

function intersectRayAABB(origin, dir, box) {
  const minX = box.x - box.w / 2;
  const maxX = box.x + box.w / 2;
  const minY = box.y - box.h / 2;
  const maxY = box.y + box.h / 2;
  const minZ = box.z - box.d / 2;
  const maxZ = box.z + box.d / 2;

  let tmin = -Infinity;
  let tmax = Infinity;

  const axes = [
    { o: origin.x, d: dir.x, min: minX, max: maxX },
    { o: origin.y, d: dir.y, min: minY, max: maxY },
    { o: origin.z, d: dir.z, min: minZ, max: maxZ }
  ];

  for (const axis of axes) {
    if (Math.abs(axis.d) < 1e-8) {
      if (axis.o < axis.min || axis.o > axis.max) return null;
    } else {
      let t1 = (axis.min - axis.o) / axis.d;
      let t2 = (axis.max - axis.o) / axis.d;
      if (t1 > t2) [t1, t2] = [t2, t1];
      tmin = Math.max(tmin, t1);
      tmax = Math.min(tmax, t2);
      if (tmin > tmax) return null;
    }
  }

  if (tmax < 0) return null;
  return tmin >= 0 ? tmin : tmax;
}

// ==========================================
// 効果音ジェネレーター (Web Audio API)
// ==========================================
let soundEnabled = localStorage.getItem('fps_sound_enabled') !== 'false';
let audioCtx = null;

function ensureAudio() {
  if (!soundEnabled) return null;
  try {
    if (!audioCtx) {
      const AudioContextCls = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCls) return null;
      audioCtx = new AudioContextCls();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

const SoundFX = {
  shot(weaponId = 'ar') {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    if (weaponId === 'sniper') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.18);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (weaponId === 'shotgun') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(115, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.14);
      gain.gain.setValueAtTime(0.26, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (weaponId === 'smg') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(270, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.055);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(48, now + 0.08);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    }
  },
  reloadOut() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.08);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  },
  reloadIn() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.06);
    gain.gain.setValueAtTime(0.13, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  },
  reloadBolt() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    [520, 740].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.055);
      gain.gain.setValueAtTime(0.13, now + idx * 0.055);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.055 + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.055);
      osc.stop(now + idx * 0.055 + 0.06);
    });
  },
  hit(isHeadshot) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = isHeadshot ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isHeadshot ? 1320 : 880, now);
    osc.frequency.exponentialRampToValueAtTime(isHeadshot ? 1760 : 520, now + 0.06);
    gain.gain.setValueAtTime(isHeadshot ? 0.24 : 0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  },
  kill() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.045);
      gain.gain.setValueAtTime(0.16, now + idx * 0.045);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.045 + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.045);
      osc.stop(now + idx * 0.045 + 0.14);
    });
  },
  damaged() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(115, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.13);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  },
  slide() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(95, now + 0.25);
    gain.gain.setValueAtTime(0.11, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  },
  healStart() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.linearRampToValueAtTime(520, now + 0.18);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  },
  healComplete() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    [440, 554.37, 659.25].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.14, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.22);
    });
  },
  switchWpn() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.045);
  }
};

// ==========================================
// UI要素
// ==========================================
const overlay = document.getElementById('overlay');
const lobbySection = document.getElementById('lobby-section');
const readySection = document.getElementById('ready-section');
const nameInput = document.getElementById('name-input');
const avatarStyleList = document.getElementById('avatar-style-list');
const avatarColorList = document.getElementById('avatar-color-list');
const mapSelect = document.getElementById('map-select');
const ruleSelect = document.getElementById('rule-select');
const createRoomBtn = document.getElementById('create-room-btn');
const roomCodeInput = document.getElementById('room-code-input');
const joinRoomBtn = document.getElementById('join-room-btn');
const roomCodeDisplay = document.getElementById('room-code-display');
const copyInviteBtn = document.getElementById('copy-invite-btn');
const hostMapControls = document.getElementById('host-map-controls');
const ingameMapSelect = document.getElementById('ingame-map-select');
const ingameRuleSelect = document.getElementById('ingame-rule-select');
const applyMapBtn = document.getElementById('apply-map-btn');
const playBtn = document.getElementById('play-btn');
const statusMsg = document.getElementById('status-msg');

const sensSlider = document.getElementById('sens-slider');
const sensVal = document.getElementById('sens-val');
const soundToggle = document.getElementById('sound-toggle');

const damageFlash = document.getElementById('damage-flash');
const healFlash = document.getElementById('heal-flash');
const lowHpVignette = document.getElementById('low-hp-vignette');
const sniperScope = document.getElementById('sniper-scope');
const damageIndicator = document.getElementById('damage-indicator');
const crosshair = document.getElementById('crosshair');
const hitmarker = document.getElementById('hitmarker');
const centerReloadRing = document.getElementById('center-reload-ring');
const centerReloadText = document.getElementById('center-reload-text');
const centerReloadFill = document.getElementById('center-reload-fill');
const damagePopups = document.getElementById('damage-popups');
const hudToast = document.getElementById('hud-toast');

const healChannelBox = document.getElementById('heal-channel-box');
const healChannelTimer = document.getElementById('heal-channel-timer');
const healChannelFill = document.getElementById('heal-channel-fill');

const matchRuleBadge = document.getElementById('match-rule-badge');
const matchScoreDisplay = document.getElementById('match-score-display');
const streakBanner = document.getElementById('streak-banner');

const minimapCanvas = document.getElementById('minimap');
const minimapCtx = minimapCanvas.getContext('2d');

const killsVal = document.getElementById('kills-val');
const deathsVal = document.getElementById('deaths-val');
const kdVal = document.getElementById('kd-val');
const roomHudCode = document.getElementById('room-hud-code');
const mapHudName = document.getElementById('map-hud-name');
const playerCountEl = document.getElementById('player-count');
const teamBadgeHud = document.getElementById('team-badge-hud');

const postureBadge = document.getElementById('posture-badge');
const hpVal = document.getElementById('hp-val');
const hpBarTrail = document.getElementById('hp-bar-trail');
const hpBar = document.getElementById('hp-bar');
const slideCard = document.getElementById('slide-card');
const slideBarFill = document.getElementById('slide-bar-fill');
const slideStatusText = document.getElementById('slide-status-text');
const medkitSlot = document.getElementById('medkit-slot');
const medkitCountEl = document.getElementById('medkit-count');

const weaponNameHud = document.getElementById('weapon-name-hud');
const weaponFiremodeHud = document.getElementById('weapon-firemode-hud');
const ammoCount = document.getElementById('ammo-count');
const ammoMax = document.getElementById('ammo-max');
const reloadStatus = document.getElementById('reload-status');
const reloadBarBg = document.getElementById('reload-bar-bg');
const reloadBarFill = document.getElementById('reload-bar-fill');
const weaponSlotEls = document.querySelectorAll('.weapon-slot');

const killFeed = document.getElementById('kill-feed');
const scoreboard = document.getElementById('scoreboard');
const scoreboardBody = document.getElementById('scoreboard-body');

const deathScreen = document.getElementById('death-screen');
const deathMsg = document.getElementById('death-msg');
const deathCountdown = document.getElementById('death-countdown');
const deathProgressFill = document.getElementById('death-progress-fill');

const victoryScreen = document.getElementById('victory-screen');
const victoryTitle = document.getElementById('victory-title');
const victorySubtitle = document.getElementById('victory-subtitle');
const victoryCountdown = document.getElementById('victory-countdown');

// ==========================================
// ローカル設定（感度・サウンド・アバター）
// ==========================================
let mouseSensitivity = parseFloat(localStorage.getItem('fps_mouse_sensitivity')) || 1.0;
mouseSensitivity = Math.max(0.2, Math.min(3.0, mouseSensitivity));
sensSlider.value = mouseSensitivity.toFixed(1);
sensVal.textContent = `${mouseSensitivity.toFixed(1)}x`;

let selectedAvatarStyle = localStorage.getItem('fps_avatar_style') || 'trooper';
if (!AVATAR_STYLES.has(selectedAvatarStyle)) selectedAvatarStyle = 'trooper';

let selectedAvatarColor = localStorage.getItem('fps_avatar_color') || '#ef4444';
if (!AVATAR_COLORS.includes(selectedAvatarColor)) selectedAvatarColor = '#ef4444';

function syncAvatarSelectionUI() {
  avatarStyleList.querySelectorAll('.avatar-style-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.style === selectedAvatarStyle);
  });
  avatarColorList.querySelectorAll('.color-swatch').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.color === selectedAvatarColor);
  });
}
syncAvatarSelectionUI();

avatarStyleList.addEventListener('click', (e) => {
  const btn = e.target.closest('.avatar-style-btn');
  if (!btn) return;
  selectedAvatarStyle = btn.dataset.style;
  localStorage.setItem('fps_avatar_style', selectedAvatarStyle);
  syncAvatarSelectionUI();
});

avatarColorList.addEventListener('click', (e) => {
  const btn = e.target.closest('.color-swatch');
  if (!btn) return;
  selectedAvatarColor = btn.dataset.color;
  localStorage.setItem('fps_avatar_color', selectedAvatarColor);
  syncAvatarSelectionUI();
});

function updateSoundBtn() {
  soundToggle.textContent = soundEnabled ? 'ON' : 'OFF';
  soundToggle.className = `btn sound-btn ${soundEnabled ? 'btn-success' : 'btn-secondary'}`;
}
updateSoundBtn();

sensSlider.addEventListener('input', () => {
  mouseSensitivity = parseFloat(sensSlider.value) || 1.0;
  sensVal.textContent = `${mouseSensitivity.toFixed(1)}x`;
  localStorage.setItem('fps_mouse_sensitivity', String(mouseSensitivity));
});

soundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  localStorage.setItem('fps_sound_enabled', String(soundEnabled));
  updateSoundBtn();
  if (soundEnabled) ensureAudio();
});

const urlParams = new URLSearchParams(window.location.search);
const presetRoom = urlParams.get('room');
if (presetRoom) {
  roomCodeInput.value = presetRoom.toUpperCase();
}

function setStatus(text, isError = false) {
  statusMsg.textContent = text;
  statusMsg.style.color = isError ? '#f87171' : '#facc15';
}

let toastTimer = null;
function showToast(text, duration = 1800) {
  hudToast.textContent = text;
  hudToast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    hudToast.classList.remove('show');
  }, duration);
}

let streakTimer = null;
function showStreakBanner(text) {
  streakBanner.textContent = text;
  streakBanner.classList.add('show');
  if (streakTimer) clearTimeout(streakTimer);
  streakTimer = setTimeout(() => {
    streakBanner.classList.remove('show');
  }, 2200);
}

function spawnDamagePopup(text, variant = '') {
  const el = document.createElement('div');
  el.className = `dmg-popup ${variant}`.trim();
  el.textContent = text;
  const offsetX = (Math.random() - 0.5) * 44;
  const offsetY = (Math.random() - 0.5) * 18 - 18;
  el.style.left = `${offsetX}px`;
  el.style.top = `${offsetY}px`;
  damagePopups.appendChild(el);
  setTimeout(() => el.remove(), 750);
}

// ==========================================
// プロシージャルPBRテクスチャファクトリ（キャッシュ済）
// ==========================================
function makeCanvasTexPair(drawFn, repeatX = 1, repeatY = 1) {
  const cMap = document.createElement('canvas');
  cMap.width = 256;
  cMap.height = 256;
  const ctxMap = cMap.getContext('2d');

  const cBump = document.createElement('canvas');
  cBump.width = 256;
  cBump.height = 256;
  const ctxBump = cBump.getContext('2d');

  drawFn(ctxMap, ctxBump);

  const map = new THREE.CanvasTexture(cMap);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(repeatX, repeatY);
  map.colorSpace = THREE.SRGBColorSpace;

  const bumpMap = new THREE.CanvasTexture(cBump);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(repeatX, repeatY);

  return { map, bumpMap };
}

function drawConcreteTex(ctx, bump, repeatScale = 1) {
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, 0, 256, 256);
  bump.fillStyle = '#808080';
  bump.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 1600; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const v = 175 + Math.floor(Math.random() * 55);
    ctx.fillStyle = `rgb(${v},${v},${v + 4})`;
    ctx.fillRect(x, y, 2, 2);
    const bv = 100 + Math.floor(Math.random() * 60);
    bump.fillStyle = `rgb(${bv},${bv},${bv})`;
    bump.fillRect(x, y, 2, 2);
  }

  ctx.strokeStyle = 'rgba(30, 41, 59, 0.38)';
  ctx.lineWidth = 3;
  bump.strokeStyle = '#303030';
  bump.lineWidth = 3;
  const step = 128;
  for (let p = 0; p <= 256; p += step) {
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, 256); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(256, p); ctx.stroke();
    bump.beginPath(); bump.moveTo(p, 0); bump.lineTo(p, 256); bump.stroke();
    bump.beginPath(); bump.moveTo(0, p); bump.lineTo(256, p); bump.stroke();
  }
  if (repeatScale > 1) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.14)';
    ctx.fillRect(0, 210, 256, 46);
  }
}

const TextureFactory = {
  cache: {},
  get(key) {
    if (this.cache[key]) return this.cache[key];

    let pair;
    if (key === 'concrete') {
      pair = makeCanvasTexPair((c, b) => drawConcreteTex(c, b, 1), 1, 1);
    } else if (key === 'wallLong') {
      pair = makeCanvasTexPair((c, b) => drawConcreteTex(c, b, 2), 8, 1);
    } else if (key === 'metal') {
      pair = makeCanvasTexPair((c, b) => {
        c.fillStyle = '#d1d5db';
        c.fillRect(0, 0, 256, 256);
        b.fillStyle = '#888888';
        b.fillRect(0, 0, 256, 256);
        for (let y = 0; y < 256; y += 2) {
          const v = 190 + Math.floor(Math.random() * 25);
          c.fillStyle = `rgb(${v},${v},${v})`;
          c.fillRect(0, y, 256, 1);
        }
        c.strokeStyle = 'rgba(15, 23, 42, 0.45)';
        c.lineWidth = 4;
        b.strokeStyle = '#303030';
        b.lineWidth = 4;
        c.strokeRect(4, 4, 248, 248);
        b.strokeRect(4, 4, 248, 248);
        c.beginPath(); c.moveTo(0, 128); c.lineTo(256, 128); c.stroke();
        b.beginPath(); b.moveTo(0, 128); b.lineTo(256, 128); b.stroke();
        const rivets = [16, 112, 144, 240];
        for (const rx of rivets) {
          for (const ry of rivets) {
            c.fillStyle = '#475569';
            c.beginPath(); c.arc(rx, ry, 4, 0, Math.PI * 2); c.fill();
            b.fillStyle = '#eeeeee';
            b.beginPath(); b.arc(rx, ry, 4, 0, Math.PI * 2); b.fill();
          }
        }
      }, 1, 1);
    } else if (key === 'container') {
      pair = makeCanvasTexPair((c, b) => {
        c.fillStyle = '#d4d4d8';
        c.fillRect(0, 0, 256, 256);
        b.fillStyle = '#808080';
        b.fillRect(0, 0, 256, 256);
        for (let x = 0; x < 256; x += 16) {
          c.fillStyle = 'rgba(0, 0, 0, 0.18)';
          c.fillRect(x, 0, 7, 256);
          c.fillStyle = 'rgba(255, 255, 255, 0.12)';
          c.fillRect(x + 8, 0, 4, 256);
          b.fillStyle = '#383838';
          b.fillRect(x, 0, 7, 256);
          b.fillStyle = '#dcdcdc';
          b.fillRect(x + 8, 0, 6, 256);
        }
        c.fillStyle = 'rgba(0, 0, 0, 0.28)';
        c.fillRect(0, 0, 256, 14);
        c.fillRect(0, 242, 256, 14);
      }, 2, 1);
    } else if (key === 'crate') {
      pair = makeCanvasTexPair((c, b) => {
        c.fillStyle = '#e5cfa8';
        c.fillRect(0, 0, 256, 256);
        b.fillStyle = '#888888';
        b.fillRect(0, 0, 256, 256);
        for (let y = 0; y < 256; y += 32) {
          c.fillStyle = y % 64 === 0 ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)';
          c.fillRect(0, y, 256, 30);
          c.fillStyle = 'rgba(60, 35, 10, 0.45)';
          c.fillRect(0, y + 30, 256, 2);
          b.fillStyle = '#303030';
          b.fillRect(0, y + 30, 256, 2);
        }
        c.strokeStyle = 'rgba(92, 60, 24, 0.65)';
        c.lineWidth = 18;
        c.strokeRect(9, 9, 238, 238);
        c.beginPath(); c.moveTo(14, 14); c.lineTo(242, 242); c.stroke();
        b.strokeStyle = '#d4d4d4';
        b.lineWidth = 18;
        b.strokeRect(9, 9, 238, 238);
      }, 1, 1);
    } else if (key === 'hazard') {
      pair = makeCanvasTexPair((c, b) => {
        c.fillStyle = '#cbd5e1';
        c.fillRect(0, 0, 256, 256);
        b.fillStyle = '#888888';
        b.fillRect(0, 0, 256, 256);
        c.fillStyle = '#eab308';
        c.fillRect(0, 0, 256, 42);
        for (let x = -64; x < 320; x += 32) {
          c.fillStyle = '#18181b';
          c.beginPath();
          c.moveTo(x, 0);
          c.lineTo(x + 16, 0);
          c.lineTo(x + 38, 42);
          c.lineTo(x + 22, 42);
          c.closePath();
          c.fill();
        }
        c.fillStyle = 'rgba(30, 41, 59, 0.3)';
        c.fillRect(0, 42, 256, 6);
        b.fillStyle = '#404040';
        b.fillRect(0, 42, 256, 6);
      }, 2, 1);
    } else if (key === 'cyber') {
      pair = makeCanvasTexPair((c, b) => {
        c.fillStyle = '#b4c6f0';
        c.fillRect(0, 0, 256, 256);
        b.fillStyle = '#707070';
        b.fillRect(0, 0, 256, 256);
        c.strokeStyle = 'rgba(34, 211, 238, 0.45)';
        c.lineWidth = 2;
        b.strokeStyle = '#e0e0e0';
        b.lineWidth = 3;
        for (let p = 0; p < 256; p += 64) {
          c.strokeRect(p + 6, 6, 52, 116);
          c.strokeRect(p + 6, 134, 52, 116);
          b.strokeRect(p + 6, 6, 52, 116);
          b.strokeRect(p + 6, 134, 52, 116);
        }
      }, 1, 1);
    } else if (key === 'floor_warehouse') {
      pair = makeCanvasTexPair((c, b) => {
        c.fillStyle = '#302c28';
        c.fillRect(0, 0, 256, 256);
        b.fillStyle = '#808080';
        b.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 1800; i++) {
          const v = 38 + Math.floor(Math.random() * 26);
          c.fillStyle = `rgb(${v + 2},${v},${v - 2})`;
          c.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
          const bv = 100 + Math.floor(Math.random() * 50);
          b.fillStyle = `rgb(${bv},${bv},${bv})`;
          b.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
        }
        c.strokeStyle = 'rgba(245, 158, 11, 0.25)';
        c.lineWidth = 3;
        c.strokeRect(2, 2, 252, 252);
      }, 12, 12);
    } else if (key === 'floor_cyber') {
      pair = makeCanvasTexPair((c, b) => {
        c.fillStyle = '#0e132b';
        c.fillRect(0, 0, 256, 256);
        b.fillStyle = '#707070';
        b.fillRect(0, 0, 256, 256);
        c.strokeStyle = 'rgba(6, 182, 212, 0.38)';
        c.lineWidth = 2;
        c.strokeRect(1, 1, 254, 254);
        c.strokeStyle = 'rgba(217, 70, 239, 0.16)';
        c.strokeRect(64, 64, 128, 128);
        b.strokeStyle = '#c8c8c8';
        b.lineWidth = 2;
        b.strokeRect(1, 1, 254, 254);
      }, 16, 16);
    } else {
      // floor_arena default
      pair = makeCanvasTexPair((c, b) => {
        c.fillStyle = '#1d273b';
        c.fillRect(0, 0, 256, 256);
        b.fillStyle = '#808080';
        b.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 1400; i++) {
          const v = 24 + Math.floor(Math.random() * 22);
          c.fillStyle = `rgb(${v},${v + 8},${v + 20})`;
          c.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
          const bv = 105 + Math.floor(Math.random() * 45);
          b.fillStyle = `rgb(${bv},${bv},${bv})`;
          b.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
        }
        c.strokeStyle = 'rgba(100, 116, 139, 0.24)';
        c.lineWidth = 3;
        c.strokeRect(2, 2, 252, 252);
        b.strokeStyle = '#383838';
        b.lineWidth = 3;
        b.strokeRect(2, 2, 252, 252);
      }, 12, 12);
    }

    this.cache[key] = pair;
    return pair;
  }
};

// ==========================================
// Three.js セットアップ & 武器モデル生成
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1220);
scene.fog = new THREE.Fog(0x0f172a, 18, 68);

const camera = new THREE.PerspectiveCamera(BASE_FOV, window.innerWidth / window.innerHeight, 0.1, 160);
camera.rotation.order = 'YXZ';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
document.body.appendChild(renderer.domElement);

const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 0.65);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xfff5e4, 1.35);
dirLight.position.set(18, 34, 14);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.shadow.camera.near = 1;
dirLight.shadow.camera.far = 95;
dirLight.shadow.bias = -0.0005;
scene.add(dirLight);

const rimLight = new THREE.DirectionalLight(0x60a5fa, 0.45);
rimLight.position.set(-18, 16, -20);
scene.add(rimLight);

// 1人称武器リグ（揺れ・マズルフラッシュ・リロード可動パーツ付き）
const gunGroup = new THREE.Group();
const gunModelGroup = new THREE.Group();
gunGroup.add(gunModelGroup);
gunGroup.position.set(0.28, -0.24, -0.45);
camera.add(gunGroup);
scene.add(camera);

const muzzleLight = new THREE.PointLight(0xffb347, 0, 7);
const muzzleFlashMat = new THREE.MeshBasicMaterial({
  color: 0xffd166,
  transparent: true,
  opacity: 0,
  depthWrite: false
});
const muzzleFlashMesh = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.18), muzzleFlashMat);
gunModelGroup.add(muzzleLight, muzzleFlashMesh);

let muzzleFlashTimer = 0;
let activeViewWeaponUserData = {};

function disposeGroup(group) {
  while (group.children.length > 0) {
    const child = group.children[0];
    group.remove(child);
    child.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
  }
}

// 1人称・3人称で共有するリアル造形＋リロード可動部付き武器モデル
function buildWeaponGeometryGroup(weaponId, scale = 1.0) {
  const g = new THREE.Group();
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.32, metalness: 0.85 });
  const gunMetal = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4, metalness: 0.7 });
  const polymer = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.65, metalness: 0.25 });

  let magMesh = null;
  let boltMesh = null;
  let muzzlePos = new THREE.Vector3(0, 0.03, -0.6);

  if (weaponId === 'smg') {
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.08, 0.42), gunMetal);
    const lower = new THREE.Mesh(new THREE.BoxGeometry(0.088, 0.06, 0.34), polymer);
    lower.position.set(0, -0.055, 0.02);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.018, 0.36), darkMetal);
    rail.position.set(0, 0.048, -0.02);
    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.036, 0.26), darkMetal);
    barrel.position.set(0, 0.015, -0.32);
    const suppressor = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.056, 0.18), darkMetal);
    suppressor.position.set(0, 0.015, -0.44);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.14, 0.075), polymer);
    grip.position.set(0, -0.12, 0.1);
    grip.rotation.x = 0.22;
    const stock = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.1, 0.18), polymer);
    stock.position.set(0, -0.01, 0.27);
    const accent = new THREE.Mesh(
      new THREE.BoxGeometry(0.098, 0.02, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.55 })
    );
    accent.position.set(0, 0.02, -0.03);

    magMesh = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.18, 0.068), darkMetal);
    magMesh.position.set(0, -0.14, -0.07);
    magMesh.rotation.x = 0.25;

    boltMesh = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 0.07), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 }));
    boltMesh.position.set(-0.052, 0.02, -0.06);

    g.add(upper, lower, rail, barrel, suppressor, grip, stock, accent, magMesh, boltMesh);
    muzzlePos.set(0, 0.015, -0.56);
  } else if (weaponId === 'shotgun') {
    const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.12, 0.42), gunMetal);
    const stock = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.11, 0.24), polymer);
    stock.position.set(0, -0.03, 0.28);
    stock.rotation.x = 0.08;
    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.048, 0.52), darkMetal);
    barrel.position.set(0, 0.04, -0.44);
    const tube = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.044, 0.46), darkMetal);
    tube.position.set(0, -0.01, -0.41);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.14, 0.08), polymer);
    grip.position.set(0, -0.11, 0.12);
    grip.rotation.x = 0.25;

    // ショットガンはポンプ＆シェルローディングブロックが動く
    boltMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.088, 0.07, 0.22),
      new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.55 })
    );
    boltMesh.position.set(0, -0.02, -0.35);

    magMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.038, 0.09, 0.05),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
    );
    magMesh.position.set(0, -0.09, -0.06);

    g.add(receiver, stock, barrel, tube, grip, boltMesh, magMesh);
    muzzlePos.set(0, 0.04, -0.73);
  } else if (weaponId === 'sniper') {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.115, 0.58), gunMetal);
    const stock = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.11, 0.24), polymer);
    stock.position.set(0, -0.02, 0.36);
    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.038, 0.66), darkMetal);
    barrel.position.set(0, 0.03, -0.58);
    const muzzleBrake = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.052, 0.1), darkMetal);
    muzzleBrake.position.set(0, 0.03, -0.92);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.14, 0.075), polymer);
    grip.position.set(0, -0.11, 0.14);
    grip.rotation.x = 0.22;
    const scope = new THREE.Mesh(new THREE.BoxGeometry(0.064, 0.064, 0.36), darkMetal);
    scope.position.set(0, 0.115, -0.06);
    const lens = new THREE.Mesh(
      new THREE.BoxGeometry(0.052, 0.052, 0.02),
      new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x9333ea, emissiveIntensity: 0.65 })
    );
    lens.position.set(0, 0.115, -0.24);

    magMesh = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.12, 0.11), darkMetal);
    magMesh.position.set(0, -0.11, -0.04);

    boltMesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.026, 0.08), new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.9, roughness: 0.2 }));
    boltMesh.position.set(0.06, 0.03, 0.04);

    g.add(body, stock, barrel, muzzleBrake, grip, scope, lens, magMesh, boltMesh);
    muzzlePos.set(0, 0.03, -0.98);
  } else {
    // Assault Rifle
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.098, 0.082, 0.46), gunMetal);
    const lower = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.06, 0.38), polymer);
    lower.position.set(0, -0.055, 0.02);
    const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.086, 0.082, 0.26), polymer);
    handguard.position.set(0, 0.01, -0.3);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.018, 0.48), darkMetal);
    rail.position.set(0, 0.052, -0.12);
    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.038, 0.3), darkMetal);
    barrel.position.set(0, 0.02, -0.52);
    const flashHider = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.052, 0.08), darkMetal);
    flashHider.position.set(0, 0.02, -0.68);
    const stock = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.11, 0.22), polymer);
    stock.position.set(0, -0.015, 0.32);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.14, 0.075), polymer);
    grip.position.set(0, -0.12, 0.11);
    grip.rotation.x = 0.22;
    const sight = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.062, 0.11), darkMetal);
    sight.position.set(0, 0.092, -0.04);
    const dot = new THREE.Mesh(
      new THREE.BoxGeometry(0.022, 0.022, 0.01),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    dot.position.set(0, 0.096, -0.04);

    magMesh = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.18, 0.088), darkMetal);
    magMesh.position.set(0, -0.14, -0.07);
    magMesh.rotation.x = 0.18;

    boltMesh = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.026, 0.075), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 }));
    boltMesh.position.set(0.052, 0.022, -0.04);

    g.add(upper, lower, handguard, rail, barrel, flashHider, stock, grip, sight, dot, magMesh, boltMesh);
    muzzlePos.set(0, 0.02, -0.74);
  }

  g.userData = {
    magMesh,
    magBasePos: magMesh ? magMesh.position.clone() : new THREE.Vector3(),
    boltMesh,
    boltBasePos: boltMesh ? boltMesh.position.clone() : new THREE.Vector3(),
    muzzlePos
  };
  g.scale.setScalar(scale);
  return g;
}

function buildViewWeapon(weaponId) {
  for (let i = gunModelGroup.children.length - 1; i >= 0; i--) {
    const c = gunModelGroup.children[i];
    if (c === muzzleLight || c === muzzleFlashMesh) continue;
    gunModelGroup.remove(c);
    c.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
  }

  const wGroup = buildWeaponGeometryGroup(weaponId, 1.0);
  gunModelGroup.add(wGroup);
  activeViewWeaponUserData = wGroup.userData;

  const mp = activeViewWeaponUserData.muzzlePos || new THREE.Vector3(0, 0.03, -0.6);
  muzzleLight.position.copy(mp);
  muzzleFlashMesh.position.copy(mp);
  resetViewWeaponPose();
}

function resetViewWeaponPose() {
  gunModelGroup.position.set(0, 0, 0);
  gunModelGroup.rotation.set(0, 0, 0);
  if (activeViewWeaponUserData.magMesh) {
    activeViewWeaponUserData.magMesh.visible = true;
    activeViewWeaponUserData.magMesh.position.copy(activeViewWeaponUserData.magBasePos);
  }
  if (activeViewWeaponUserData.boltMesh) {
    activeViewWeaponUserData.boltMesh.position.copy(activeViewWeaponUserData.boltBasePos);
  }
}

buildViewWeapon('ar');

// マップ & スカイドーム & ピックアップ & 弾痕管理
const mapGroup = new THREE.Group();
scene.add(mapGroup);
let pickupMeshes = [];
let currentSkyTexture = null;
const bulletHoles = [];

function createSkyDome(map) {
  if (currentSkyTexture) {
    currentSkyTexture.dispose();
    currentSkyTexture = null;
  }
  const c = document.createElement('canvas');
  c.width = 16;
  c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0.0, map.skyColors[0]);
  grad.addColorStop(0.48, map.skyColors[1]);
  grad.addColorStop(0.8, map.skyColors[2]);
  grad.addColorStop(1.0, map.skyColors[0]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 16, 256);

  currentSkyTexture = new THREE.CanvasTexture(c);
  currentSkyTexture.colorSpace = THREE.SRGBColorSpace;
  const skyGeo = new THREE.SphereGeometry(95, 24, 16);
  const skyMat = new THREE.MeshBasicMaterial({ map: currentSkyTexture, side: THREE.BackSide, fog: false });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  mapGroup.add(sky);
}

function createPickupVisual(sp) {
  const group = new THREE.Group();
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    emissive: 0x064e3b,
    emissiveIntensity: 0.45,
    roughness: 0.3,
    metalness: 0.2
  });
  const crossMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x10b981,
    emissiveIntensity: 0.8,
    roughness: 0.25
  });

  const box = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.4, 0.55), baseMat);
  const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.43, 0.12), crossMat);
  const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.43, 0.32), crossMat);
  group.add(box, crossH, crossV);
  group.position.set(sp.x, sp.y + 0.55, sp.z);
  mapGroup.add(group);
  return group;
}

function addMapArchitecturalProps(map) {
  const half = map.size / 2;
  const wallH = map.id === 'arena' ? 5 : 6;
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.75 });

  // 外周壁上部の金属トリム
  const trimN = new THREE.Mesh(new THREE.BoxGeometry(map.size + 1, 0.22, 1.2), trimMat);
  trimN.position.set(0, wallH + 0.11, -half);
  const trimS = trimN.clone();
  trimS.position.z = half;
  const trimW = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.22, map.size + 1), trimMat);
  trimW.position.set(-half, wallH + 0.11, 0);
  const trimE = trimW.clone();
  trimE.position.x = half;
  mapGroup.add(trimN, trimS, trimW, trimE);

  // 4隅のライトポール（視覚演出）
  const lanternColor = map.id === 'cyber' ? 0x22d3ee : map.id === 'warehouse' ? 0xf59e0b : 0x93c5fd;
  const lanternMat = new THREE.MeshBasicMaterial({ color: lanternColor });
  const poleOffsets = [
    [-half + 0.6, -half + 0.6],
    [half - 0.6, -half + 0.6],
    [-half + 0.6, half - 0.6],
    [half - 0.6, half - 0.6]
  ];
  for (const [px, pz] of poleOffsets) {
    const pole = new THREE.Mesh(new THREE.BoxGeometry(0.35, wallH + 2.4, 0.35), trimMat);
    pole.position.set(px, (wallH + 2.4) / 2, pz);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.3, 0.55), lanternMat);
    lamp.position.set(px, wallH + 2.5, pz);
    mapGroup.add(pole, lamp);
  }

  // 倉庫の天井鉄骨トラス（非衝突）
  if (map.id === 'warehouse') {
    for (let z = -16; z <= 16; z += 16) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(map.size, 0.45, 0.55), trimMat);
      beam.position.set(0, 9.5, z);
      mapGroup.add(beam);
    }
  }

  // サイバーマップ外周の遠景モノリス群（非衝突）
  if (map.id === 'cyber') {
    const monoMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.5 });
    const glowCyan = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const glowPink = new THREE.MeshBasicMaterial({ color: 0xd946ef });
    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2;
      const dist = 34 + (i % 3) * 4;
      const h = 14 + (i % 4) * 5;
      const mx = Math.cos(ang) * dist;
      const mz = Math.sin(ang) * dist;
      const tower = new THREE.Mesh(new THREE.BoxGeometry(3.2, h, 3.2), monoMat);
      tower.position.set(mx, h / 2, mz);
      const strip = new THREE.Mesh(new THREE.BoxGeometry(3.35, 0.45, 3.35), i % 2 === 0 ? glowCyan : glowPink);
      strip.position.set(mx, h - 1.5, mz);
      mapGroup.add(tower, strip);
    }
  }
}

function loadMap(mapId) {
  const map = MAPS[mapId] || MAPS.arena;
  currentMapId = map.id;

  disposeGroup(mapGroup);
  pickupMeshes = [];
  bulletHoles.length = 0;

  scene.background = new THREE.Color(map.bgColor);
  scene.fog = new THREE.Fog(map.fogColor, 18, map.size + 32);

  hemiLight.intensity = map.ambientIntensity;
  dirLight.color.setHex(map.sunColor);
  dirLight.intensity = map.sunIntensity;
  rimLight.color.setHex(map.rimColor);
  rimLight.intensity = map.rimIntensity;

  const bound = map.size * 0.62;
  dirLight.shadow.camera.left = -bound;
  dirLight.shadow.camera.right = bound;
  dirLight.shadow.camera.top = bound;
  dirLight.shadow.camera.bottom = -bound;
  dirLight.shadow.camera.updateProjectionMatrix();

  createSkyDome(map);

  const floorTex = TextureFactory.get(`floor_${map.floorType}`);
  const floorGeo = new THREE.PlaneGeometry(map.size, map.size);
  const floorMat = new THREE.MeshStandardMaterial({
    map: floorTex.map,
    bumpMap: floorTex.bumpMap,
    bumpScale: 0.04,
    roughness: 0.85,
    metalness: 0.08
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  mapGroup.add(floor);

  for (const obs of map.obstacles) {
    const texKey = obs.matType || 'concrete';
    const texPair = TextureFactory.get(texKey);
    const geo = new THREE.BoxGeometry(obs.w, obs.h, obs.d);
    const mat = new THREE.MeshStandardMaterial({
      color: obs.color,
      map: texPair.map,
      bumpMap: texPair.bumpMap,
      bumpScale: texKey === 'container' ? 0.08 : 0.04,
      roughness: texKey === 'metal' || texKey === 'container' ? 0.48 : 0.78,
      metalness: texKey === 'metal' || texKey === 'container' ? 0.45 : texKey === 'cyber' ? 0.3 : 0.08
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(obs.x, obs.y, obs.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mapGroup.add(mesh);
  }

  addMapArchitecturalProps(map);

  for (const sp of map.pickupSpawns) {
    pickupMeshes.push(createPickupVisual(sp));
  }

  mapHudName.textContent = map.name;
  mapSelect.value = map.id;
  ingameMapSelect.value = map.id;
}

loadMap('arena');

mapSelect.addEventListener('change', () => {
  if (!isConnected) {
    loadMap(mapSelect.value);
  }
});

// ==========================================
// ゲーム状態・プレイヤー状態・アバターモデル
// ==========================================
let myId = null;
let currentRoomCode = '';
let isConnected = false;
let isHost = false;
let peer = null;
let hostConn = null;
const guestConns = new Map();
const hostPlayers = {};
let hostPickups = [];
let hostTickTimer = null;

const latestPlayersSnapshot = {};
const otherPlayers = {};
const tracers = [];
const impactParticles = [];
const shellCasings = [];

const playerState = {
  pos: new THREE.Vector3(0, 0, 12),
  vel: new THREE.Vector3(0, 0, 0),
  yaw: 0,
  pitch: 0,
  onGround: true,
  alive: true,
  hp: 100,
  team: null,
  // 武器 & エイム (ADS) & リロード
  weaponId: 'ar',
  weaponAmmo: { ar: 30, smg: 36, shotgun: 6, sniper: 5 },
  isAiming: false,
  adsBlend: 0,
  isFiring: false,
  isReloading: false,
  reloadStartTime: 0,
  reloadDuration: 1400,
  reloadTimeout: null,
  reloadSoundTimers: [],
  lastShotTime: 0,
  // 姿勢（しゃがみ & スライディング）
  crouchToggle: false,
  isCrouching: false,
  isSliding: false,
  slideTimer: 0,
  slideCooldown: 0,
  slideDir: new THREE.Vector3(),
  currentEyeHeight: EYE_HEIGHT,
  currentFov: BASE_FOV,
  cameraRoll: 0,
  // 移動・拡散・揺れ
  moveRatio: 0,
  fireBloom: 0,
  walkBobTime: 0,
  swayX: 0,
  swayY: 0,
  // 回復アイテム
  medkits: INITIAL_MEDKITS,
  isHealing: false,
  healEndTime: 0,
  // 死亡カウントダウン
  respawnEndTime: 0,
  respawnDuration: RESPAWN_SECONDS * 1000,
  // キルストリーク
  killStreak: 0,
  multiKillCount: 0,
  lastKillAt: 0,
  // エフェクト
  crosshairSpread: 10,
  cameraShake: 0,
  dmgIndicatorTimer: 0,
  lastAttackerPos: null
};

function getActiveWeapon() {
  return WEAPONS[playerState.weaponId] || WEAPONS.ar;
}

function getEffectiveReloadMs(weapon) {
  if (currentRuleId === 'sniper' && weapon.id === 'sniper') {
    return 1300;
  }
  return weapon.reloadMs;
}

function computeCurrentSpread(weapon) {
  const base = THREE.MathUtils.lerp(weapon.hipSpread, weapon.adsSpread, playerState.adsBlend);
  const movePenalty =
    playerState.moveRatio *
    weapon.moveSpread *
    THREE.MathUtils.lerp(1.0, weapon.id === 'sniper' ? 0.55 : 0.42, playerState.adsBlend);
  const airPenalty = !playerState.onGround ? weapon.airSpread : 0;
  const slidePenalty = playerState.isSliding ? 0.035 : 0;
  const bloom = playerState.fireBloom * THREE.MathUtils.lerp(1.0, 0.5, playerState.adsBlend);

  let total = base + movePenalty + airPenalty + slidePenalty + bloom;
  if (playerState.isCrouching && playerState.onGround && !playerState.isSliding) {
    total *= 0.65;
  }
  return total;
}

function updateHpUI(hp) {
  playerState.hp = hp;
  hpVal.textContent = hp;
  hpBar.style.width = `${hp}%`;
  hpBarTrail.style.width = `${hp}%`;
  if (hp > 50) hpBar.style.background = '#22c55e';
  else if (hp > 25) hpBar.style.background = '#f59e0b';
  else hpBar.style.background = '#ef4444';

  lowHpVignette.style.display = hp > 0 && hp <= 35 ? 'block' : 'none';
}

function updateMedkitUI() {
  const rule = getCurrentRule();
  medkitCountEl.textContent = rule.allowMedkits ? playerState.medkits : '0';
  if (rule.allowMedkits && playerState.medkits > 0) {
    medkitSlot.classList.add('heal-ready');
  } else {
    medkitSlot.classList.remove('heal-ready');
  }
}

function updateAmmoUI() {
  const w = getActiveWeapon();
  const ammo = playerState.weaponAmmo[w.id] ?? w.mag;
  weaponNameHud.textContent = w.name;
  weaponFiremodeHud.textContent = w.auto ? 'FULL-AUTO' : 'SEMI';
  ammoCount.textContent = ammo;
  ammoMax.textContent = `/ ${w.mag}`;
  ammoCount.classList.toggle('low', ammo <= Math.max(2, Math.floor(w.mag * 0.22)));
}

function updateWeaponSlotsUI() {
  const locked = getCurrentRule().lockedWeapon;
  weaponSlotEls.forEach((el) => {
    const id = el.dataset.weapon;
    el.classList.toggle('active', id === playerState.weaponId);
    el.classList.toggle('locked', Boolean(locked && id !== locked));
  });
}

function updateTeamBadgeUI(team) {
  playerState.team = team;
  if (getCurrentRule().teamMode && team) {
    teamBadgeHud.style.display = 'block';
    const isRed = team === 'red';
    teamBadgeHud.textContent = isRed ? 'TEAM RED' : 'TEAM BLUE';
    teamBadgeHud.style.background = isRed ? 'rgba(239, 68, 68, 0.25)' : 'rgba(59, 130, 246, 0.25)';
    teamBadgeHud.style.border = `1px solid ${isRed ? '#ef4444' : '#3b82f6'}`;
    teamBadgeHud.style.color = isRed ? '#fca5a5' : '#93c5fd';
  } else {
    teamBadgeHud.style.display = 'none';
  }
}

function updatePostureUI() {
  if (playerState.isSliding) {
    postureBadge.textContent = 'SLIDE';
    postureBadge.className = 'slide';
  } else if (playerState.isCrouching) {
    postureBadge.textContent = 'CROUCH';
    postureBadge.className = 'crouch';
  } else {
    postureBadge.textContent = 'STAND';
    postureBadge.className = '';
  }
}

function cancelLocalReload() {
  if (playerState.reloadTimeout) {
    clearTimeout(playerState.reloadTimeout);
    playerState.reloadTimeout = null;
  }
  for (const tid of playerState.reloadSoundTimers) {
    clearTimeout(tid);
  }
  playerState.reloadSoundTimers = [];
  playerState.isReloading = false;
  reloadStatus.textContent = '';
  reloadBarBg.style.display = 'none';
  centerReloadRing.style.display = 'none';
  resetViewWeaponPose();
}

function switchWeapon(weaponId, silent = false) {
  const rule = getCurrentRule();
  const targetId = rule.lockedWeapon || weaponId;
  if (!WEAPONS[targetId]) return;
  if (playerState.weaponId === targetId && !silent) return;

  cancelLocalReload();
  playerState.isAiming = false;
  playerState.isFiring = false;
  playerState.fireBloom = 0;
  playerState.weaponId = targetId;
  buildViewWeapon(targetId);
  updateAmmoUI();
  updateWeaponSlotsUI();
  if (!silent) {
    SoundFX.switchWpn();
    sendToHost({ type: 'switchWeapon', weaponId: targetId });
  }
}

function resetAllWeaponAmmo() {
  for (const id of WEAPON_ORDER) {
    playerState.weaponAmmo[id] = WEAPONS[id].mag;
  }
}

function resetLocalPlayerForSpawn(x, y, z, hp = 100, medkits = INITIAL_MEDKITS, team = playerState.team) {
  playerState.pos.set(x, y, z);
  playerState.vel.set(0, 0, 0);
  resetAllWeaponAmmo();
  cancelLocalReload();
  playerState.crouchToggle = false;
  playerState.isCrouching = false;
  playerState.isSliding = false;
  playerState.slideTimer = 0;
  playerState.slideCooldown = 0;
  playerState.isHealing = false;
  playerState.healEndTime = 0;
  playerState.isAiming = false;
  playerState.adsBlend = 0;
  playerState.isFiring = false;
  playerState.fireBloom = 0;
  playerState.moveRatio = 0;
  playerState.medkits = medkits;
  playerState.respawnEndTime = 0;
  playerState.alive = true;

  const locked = getCurrentRule().lockedWeapon;
  if (locked) {
    switchWeapon(locked, true);
  } else {
    buildViewWeapon(playerState.weaponId);
  }

  gunGroup.visible = true;
  sniperScope.style.display = 'none';
  crosshair.style.opacity = '1';
  healChannelBox.style.display = 'none';
  deathScreen.style.display = 'none';
  updatePostureUI();
  updateTeamBadgeUI(team);
  updateHpUI(hp);
  updateMedkitUI();
  updateAmmoUI();
  updateWeaponSlotsUI();
}

function drawNameSpriteCanvas(canvas, name, hp, team) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.fillRect(18, 6, 220, 48);

  if (team === 'red' || team === 'blue') {
    ctx.fillStyle = team === 'red' ? '#ef4444' : '#3b82f6';
    ctx.fillRect(18, 6, 6, 48);
  }

  ctx.font = 'bold 22px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, 128, 24);

  const pct = Math.max(0, Math.min(1, (hp ?? 100) / 100));
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(36, 41, 184, 7);
  ctx.fillStyle = pct > 0.5 ? '#22c55e' : pct > 0.25 ? '#f59e0b' : '#ef4444';
  ctx.fillRect(36, 41, 184 * pct, 7);
}

function createNameSprite(name, hp, team) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  drawNameSpriteCanvas(canvas, name, hp, team);

  const texture = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.75, 0.44, 1);
  sprite.position.set(0, 2.42, 0);
  return { sprite, canvas, texture };
}

function getEffectiveAvatarColorNum(pData) {
  if (getCurrentRule().teamMode && pData.team) {
    return pData.team === 'red' ? 0xef4444 : 0x3b82f6;
  }
  return parseColorNum(pData.avatarColor);
}

function createPlayerMesh(pData) {
  const group = new THREE.Group();
  const bodyGroup = new THREE.Group();
  const style = AVATAR_STYLES.has(pData.avatarStyle) ? pData.avatarStyle : 'trooper';
  const mainColor = getEffectiveAvatarColorNum(pData);

  const armorMat = new THREE.MeshStandardMaterial({ color: mainColor, roughness: 0.42, metalness: 0.25 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });
  const accentMat = new THREE.MeshStandardMaterial({
    color: style === 'cyber' ? 0x22d3ee : style === 'ninja' ? 0xf43f5e : 0x38bdf8,
    emissive: style === 'cyber' ? 0x0891b2 : style === 'ninja' ? 0xbe123c : 0x0284c7,
    emissiveIntensity: 0.65,
    roughness: 0.25
  });
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.6 });

  const leftLegPivot = new THREE.Group();
  leftLegPivot.position.set(-0.17, 0.72, 0);
  const leftLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.56, 0.24), darkMat);
  leftLegMesh.position.set(0, -0.28, 0);
  leftLegMesh.castShadow = true;
  const leftBoot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.28), armorMat);
  leftBoot.position.set(0, -0.64, -0.02);
  leftBoot.castShadow = true;
  leftLegPivot.add(leftLegMesh, leftBoot);

  const rightLegPivot = new THREE.Group();
  rightLegPivot.position.set(0.17, 0.72, 0);
  const rightLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.56, 0.24), darkMat);
  rightLegMesh.position.set(0, -0.28, 0);
  rightLegMesh.castShadow = true;
  const rightBoot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.28), armorMat);
  rightBoot.position.set(0, -0.64, -0.02);
  rightBoot.castShadow = true;
  rightLegPivot.add(rightLegMesh, rightBoot);

  const torsoGroup = new THREE.Group();
  torsoGroup.position.set(0, 1.08, 0);
  const torsoBase = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.72, 0.32), darkMat);
  torsoBase.castShadow = true;
  torsoGroup.add(torsoBase);

  if (style === 'cyber') {
    const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.42, 0.37), armorMat);
    chestPlate.position.set(0, 0.12, 0);
    chestPlate.castShadow = true;
    const core = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.39), accentMat);
    core.position.set(0, 0.14, 0);
    const thrusterL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.34, 0.18), armorMat);
    thrusterL.position.set(-0.18, 0.12, 0.22);
    const thrusterR = thrusterL.clone();
    thrusterR.position.x = 0.18;
    torsoGroup.add(chestPlate, core, thrusterL, thrusterR);
  } else if (style === 'ninja') {
    const vest = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.52, 0.35), armorMat);
    vest.position.set(0, 0.08, 0);
    vest.castShadow = true;
    const scarf = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.44), accentMat);
    scarf.position.set(0.08, 0.3, 0.18);
    scarf.rotation.x = 0.25;
    torsoGroup.add(vest, scarf);
  } else {
    const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.46, 0.37), armorMat);
    chestPlate.position.set(0, 0.1, 0);
    chestPlate.castShadow = true;
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.44, 0.18), armorMat);
    pack.position.set(0, 0.08, 0.22);
    const packCore = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 0.04), accentMat);
    packCore.position.set(0, 0.1, 0.31);
    torsoGroup.add(chestPlate, pack, packCore);
  }

  const leftArmPivot = new THREE.Group();
  leftArmPivot.position.set(-0.4, 1.35, 0);
  const leftShoulder = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.24), armorMat);
  const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.56, 0.18), darkMat);
  leftArm.position.set(0, -0.24, 0);
  leftArm.castShadow = true;
  leftArmPivot.add(leftShoulder, leftArm);

  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.4, 1.35, 0);
  const rightShoulder = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.24), armorMat);
  const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.18), darkMat);
  rightArm.position.set(0, -0.18, -0.14);
  rightArm.rotation.x = Math.PI / 2.4;
  rightArm.castShadow = true;

  const thirdPersonWeaponHolder = new THREE.Group();
  thirdPersonWeaponHolder.position.set(-0.04, -0.24, -0.34);
  const wId = WEAPONS[pData.weaponId] ? pData.weaponId : 'ar';
  thirdPersonWeaponHolder.add(buildWeaponGeometryGroup(wId, 0.72));
  rightArmPivot.add(rightShoulder, rightArm, thirdPersonWeaponHolder);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.68, 0);

  if (style === 'cyber') {
    const mechHead = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.4, 0.42), armorMat);
    mechHead.castShadow = true;
    const eyeStrip = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.1, 0.06), accentMat);
    eyeStrip.position.set(0, 0.03, -0.2);
    const antL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.04), accentMat);
    antL.position.set(-0.16, 0.28, 0.04);
    const antR = antL.clone();
    antR.position.x = 0.16;
    headGroup.add(mechHead, eyeStrip, antL, antR);
  } else if (style === 'ninja') {
    const cowl = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), darkMat);
    cowl.castShadow = true;
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.11, 0.44), armorMat);
    band.position.set(0, 0.12, 0);
    const faceSlot = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.11, 0.04), skinMat);
    faceSlot.position.set(0, 0.02, -0.2);
    const eyes = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.05), accentMat);
    eyes.position.set(0, 0.03, -0.21);
    headGroup.add(cowl, band, faceSlot, eyes);
  } else {
    const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.44, 0.44), armorMat);
    helmet.castShadow = true;
    const crest = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.46), darkMat);
    crest.position.set(0, 0.22, 0);
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.08), accentMat);
    visor.position.set(0, 0.03, -0.2);
    headGroup.add(helmet, crest, visor);
  }

  bodyGroup.add(leftLegPivot, rightLegPivot, torsoGroup, leftArmPivot, rightArmPivot, headGroup);

  const healAura = new THREE.Mesh(
    new THREE.RingGeometry(0.55, 0.75, 24),
    new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
  );
  healAura.rotation.x = -Math.PI / 2;
  healAura.position.y = 0.08;
  healAura.visible = false;

  const { sprite: nameSprite, canvas: nameCanvas, texture: nameTexture } = createNameSprite(
    pData.name,
    pData.hp,
    pData.team
  );

  group.add(bodyGroup, healAura, nameSprite);
  group.position.set(pData.x, pData.y, pData.z);
  scene.add(group);

  return {
    group,
    bodyGroup,
    leftLegPivot,
    rightLegPivot,
    leftArmPivot,
    rightArmPivot,
    thirdPersonWeaponHolder,
    healAura,
    nameSprite,
    nameCanvas,
    nameTexture,
    name: pData.name,
    hp: pData.hp ?? 100,
    team: pData.team || null,
    avatarStyle: style,
    avatarColor: pData.avatarColor || '#3b82f6',
    weaponId: wId,
    targetPos: new THREE.Vector3(pData.x, pData.y, pData.z),
    targetYaw: pData.yaw,
    walkPhase: 0,
    crouching: false,
    sliding: false,
    healing: false,
    reloading: false,
    lastShotAt: 0
  };
}

// ==========================================
// タクティカルミニマップ描画
// ==========================================
function drawMinimap() {
  const ctx = minimapCtx;
  const w = minimapCanvas.width;
  const h = minimapCanvas.height;
  const halfW = w / 2;
  const halfH = h / 2;
  const map = getCurrentMap();
  const scale = 3.1; // 1m = 3.1px (約48m四方をカバー)
  const cosY = Math.cos(playerState.yaw);
  const sinY = Math.sin(playerState.yaw);

  ctx.clearRect(0, 0, w, h);

  // 背景レーダー円・同心リング
  ctx.fillStyle = 'rgba(8, 15, 30, 0.9)';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
  ctx.lineWidth = 1;
  [28, 56].forEach((r) => {
    ctx.beginPath();
    ctx.arc(halfW, halfH, r, 0, Math.PI * 2);
    ctx.stroke();
  });

  // ワールド座標 -> 自視点ローカル座標（上が正面 -Z）
  const toRadar = (wx, wz) => {
    const dx = wx - playerState.pos.x;
    const dz = wz - playerState.pos.z;
    const rx = dx * cosY - dz * sinY;
    const rz = dx * sinY + dz * cosY;
    return { x: halfW + rx * scale, y: halfH + rz * scale };
  };

  // 障害物を回転して描画
  ctx.fillStyle = 'rgba(148, 163, 184, 0.34)';
  for (const obs of map.obstacles) {
    const hw = obs.w / 2;
    const hd = obs.d / 2;
    const corners = [
      toRadar(obs.x - hw, obs.z - hd),
      toRadar(obs.x + hw, obs.z - hd),
      toRadar(obs.x + hw, obs.z + hd),
      toRadar(obs.x - hw, obs.z + hd)
    ];
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(corners[i].x, corners[i].y);
    ctx.closePath();
    ctx.fill();
  }

  // アクティブな回復ピックアップ（緑）
  for (let i = 0; i < map.pickupSpawns.length; i++) {
    if (pickupMeshes[i] && !pickupMeshes[i].visible) continue;
    const pt = toRadar(map.pickupSpawns[i].x, map.pickupSpawns[i].z);
    if (pt.x < 4 || pt.x > w - 4 || pt.y < 4 || pt.y > h - 4) continue;
    ctx.fillStyle = '#10b981';
    ctx.fillRect(pt.x - 2.5, pt.y - 2.5, 5, 5);
  }

  // 他プレイヤー（味方は常時青/赤、敵は直近1.8秒以内の射撃時のみ赤い反応）
  const nowPerf = performance.now();
  const isTdm = getCurrentRule().teamMode;
  for (const id in otherPlayers) {
    const op = otherPlayers[id];
    if (!op.group.visible) continue;
    const isAlly = isTdm && playerState.team && op.team === playerState.team;
    const recentlyFired = nowPerf - op.lastShotAt < 1800;
    if (!isAlly && !recentlyFired) continue;

    const pt = toRadar(op.group.position.x, op.group.position.z);
    const clampedX = Math.max(6, Math.min(w - 6, pt.x));
    const clampedY = Math.max(6, Math.min(h - 6, pt.y));

    ctx.fillStyle = isAlly ? '#60a5fa' : '#ef4444';
    ctx.beginPath();
    ctx.arc(clampedX, clampedY, isAlly ? 4 : 4.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 自分の視界コーン＆自機マーカー
  ctx.fillStyle = 'rgba(56, 189, 248, 0.14)';
  ctx.beginPath();
  ctx.moveTo(halfW, halfH);
  ctx.arc(halfW, halfH, 42, -Math.PI / 2 - 0.55, -Math.PI / 2 + 0.55);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(halfW, halfH - 6);
  ctx.lineTo(halfW + 4.5, halfH + 4.5);
  ctx.lineTo(halfW - 4.5, halfH + 4.5);
  ctx.closePath();
  ctx.fill();
}

// ==========================================
// スコアボード & マッチバナー更新
// ==========================================
function renderScoreboard() {
  const list = Object.values(latestPlayersSnapshot).sort((a, b) => {
    if (b.kills !== a.kills) return b.kills - a.kills;
    return a.deaths - b.deaths;
  });

  scoreboardBody.innerHTML = '';
  for (const p of list) {
    const tr = document.createElement('tr');
    if (p.id === myId) tr.className = 'me-row';
    const kd = p.deaths > 0 ? (p.kills / p.deaths).toFixed(2) : p.kills.toFixed(2);
    const statusLabel = !p.alive ? 'DEAD' : p.healing ? 'HEALING' : 'ALIVE';
    const wShort = (WEAPONS[p.weaponId] || WEAPONS.ar).shortName;
    const dotColor = getCurrentRule().teamMode && p.team
      ? (p.team === 'red' ? '#ef4444' : '#3b82f6')
      : (p.avatarColor || '#38bdf8');
    tr.innerHTML = `
      <td><span class="sb-dot" style="background:${escapeHtml(dotColor)}"></span>${escapeHtml(p.name)}${p.id === myId ? ' (You)' : ''}</td>
      <td>${wShort}</td>
      <td>${p.kills}</td>
      <td>${p.deaths}</td>
      <td>${kd}</td>
      <td>${statusLabel}</td>
    `;
    scoreboardBody.appendChild(tr);
  }
}

function updateMatchBannerUI() {
  const rule = getCurrentRule();
  matchRuleBadge.textContent = rule.name;

  if (rule.teamMode) {
    matchScoreDisplay.innerHTML =
      `<span class="team-red-text">RED ${teamScores.red}</span> — <span class="team-blue-text">BLUE ${teamScores.blue}</span> <span style="color:#94a3b8">/ ${rule.targetKills}</span>`;
  } else {
    const playersArr = Object.values(latestPlayersSnapshot);
    let leader = null;
    for (const p of playersArr) {
      if (!leader || p.kills > leader.kills) leader = p;
    }
    if (leader) {
      matchScoreDisplay.textContent = `TOP: ${leader.name} (${leader.kills} / ${rule.targetKills})`;
    } else {
      matchScoreDisplay.textContent = `目標 ${rule.targetKills} KILLS`;
    }
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

// ==========================================
// ネットワーク抽象化（ホスト権限型 WebRTC）
// ==========================================
function broadcastFromHost(msg) {
  handleServerMessage(msg);
  for (const conn of guestConns.values()) {
    if (conn.open) {
      conn.send(msg);
    }
  }
}

function sendToPlayerFromHost(targetId, msg) {
  if (targetId === myId) {
    handleServerMessage(msg);
  } else {
    const conn = guestConns.get(targetId);
    if (conn && conn.open) {
      conn.send(msg);
    }
  }
}

function sendToHost(msg) {
  if (!isConnected) return;
  if (isHost) {
    handleHostReceive(myId, msg);
  } else if (hostConn && hostConn.open) {
    hostConn.send(msg);
  }
}

function initHostPickups(mapId = currentMapId) {
  const map = MAPS[mapId] || MAPS.arena;
  const allow = getCurrentRule().allowMedkits;
  hostPickups = map.pickupSpawns.map((sp) => ({
    x: sp.x,
    y: sp.y,
    z: sp.z,
    active: allow,
    respawnAt: 0
  }));
}

function cancelHostHeal(p) {
  if (p.healTimer) {
    clearTimeout(p.healTimer);
    p.healTimer = null;
  }
  p.healing = false;
}

function assignTeamBalanced() {
  let redCount = 0;
  let blueCount = 0;
  for (const id in hostPlayers) {
    if (hostPlayers[id].team === 'red') redCount++;
    else if (hostPlayers[id].team === 'blue') blueCount++;
  }
  return redCount <= blueCount ? 'red' : 'blue';
}

function hostAddPlayer(id, joinData = {}) {
  const spawn = getRandomSpawn(currentMapId);
  const cleanName = String(joinData.name || '').trim().slice(0, 16) || `Player_${id.slice(-4)}`;
  const style = AVATAR_STYLES.has(joinData.avatarStyle) ? joinData.avatarStyle : 'trooper';
  const color = AVATAR_COLORS.includes(joinData.avatarColor)
    ? joinData.avatarColor
    : AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  const rule = getCurrentRule();
  const team = rule.teamMode ? assignTeamBalanced() : null;
  const initialMedkits = rule.allowMedkits ? INITIAL_MEDKITS : 0;

  hostPlayers[id] = {
    id,
    name: cleanName,
    avatarStyle: style,
    avatarColor: color,
    team,
    weaponId: rule.lockedWeapon || 'ar',
    x: spawn.x,
    y: spawn.y,
    z: spawn.z,
    yaw: 0,
    pitch: 0,
    hp: 100,
    kills: 0,
    deaths: 0,
    alive: true,
    crouching: false,
    sliding: false,
    healing: false,
    reloading: false,
    healTimer: null,
    respawnTimer: null,
    medkits: initialMedkits
  };

  sendToPlayerFromHost(id, {
    type: 'init',
    id,
    mapId: currentMapId,
    ruleId: currentRuleId,
    teamScores,
    matchOver,
    pickups: hostPickups.map((pk) => pk.active),
    players: serializePlayersForNet()
  });
}

function serializePlayersForNet() {
  const out = {};
  for (const id in hostPlayers) {
    const p = hostPlayers[id];
    out[id] = {
      id: p.id,
      name: p.name,
      avatarStyle: p.avatarStyle,
      avatarColor: p.avatarColor,
      team: p.team,
      weaponId: p.weaponId,
      x: p.x,
      y: p.y,
      z: p.z,
      yaw: p.yaw,
      pitch: p.pitch,
      hp: p.hp,
      kills: p.kills,
      deaths: p.deaths,
      alive: p.alive,
      crouching: p.crouching,
      sliding: p.sliding,
      healing: p.healing,
      reloading: p.reloading,
      medkits: p.medkits
    };
  }
  return out;
}

function hostResetMatch(newMapId = currentMapId, newRuleId = currentRuleId) {
  if (MAPS[newMapId]) currentMapId = newMapId;
  if (RULES[newRuleId]) currentRuleId = newRuleId;

  const rule = getCurrentRule();
  teamScores = { red: 0, blue: 0 };
  matchOver = false;
  initHostPickups(currentMapId);

  let idx = 0;
  for (const id in hostPlayers) {
    const p = hostPlayers[id];
    cancelHostHeal(p);
    if (p.respawnTimer) {
      clearTimeout(p.respawnTimer);
      p.respawnTimer = null;
    }
    const sp = getRandomSpawn(currentMapId);
    p.x = sp.x;
    p.y = sp.y;
    p.z = sp.z;
    p.hp = 100;
    p.kills = 0;
    p.deaths = 0;
    p.alive = true;
    p.crouching = false;
    p.sliding = false;
    p.reloading = false;
    p.medkits = rule.allowMedkits ? INITIAL_MEDKITS : 0;
    p.weaponId = rule.lockedWeapon || 'ar';
    p.team = rule.teamMode ? (idx % 2 === 0 ? 'red' : 'blue') : null;
    idx++;
  }

  broadcastFromHost({
    type: 'matchReset',
    mapId: currentMapId,
    ruleId: currentRuleId,
    teamScores,
    pickups: hostPickups.map((pk) => pk.active),
    players: serializePlayersForNet()
  });
}

function hostTriggerMatchOver(winnerName, winnerTeam) {
  if (matchOver) return;
  matchOver = true;
  const rule = getCurrentRule();

  broadcastFromHost({
    type: 'matchOver',
    winnerName,
    winnerTeam,
    ruleName: rule.name,
    restartIn: MATCH_RESTART_SECONDS
  });

  setTimeout(() => {
    if (!isHost || !isConnected) return;
    hostResetMatch(currentMapId, currentRuleId);
  }, MATCH_RESTART_SECONDS * 1000);
}

function handleHostReceive(senderId, msg) {
  const p = hostPlayers[senderId];

  if (msg.type === 'join') {
    if (!p) {
      hostAddPlayer(senderId, msg);
    }
    return;
  }

  if (!p) return;

  if (msg.type === 'switchWeapon') {
    const rule = getCurrentRule();
    if (rule.lockedWeapon) {
      p.weaponId = rule.lockedWeapon;
    } else if (WEAPONS[msg.weaponId]) {
      p.weaponId = msg.weaponId;
    }
    return;
  }

  if (msg.type === 'playerMove') {
    if (!p.alive) return;
    const map = getCurrentMap();
    const limit = map.size / 2 - 0.5;
    if (!p.healing && !matchOver) {
      p.x = Math.max(-limit, Math.min(limit, Number(msg.x) || 0));
      p.y = Math.max(0, Math.min(25, Number(msg.y) || 0));
      p.z = Math.max(-limit, Math.min(limit, Number(msg.z) || 0));
      p.sliding = Boolean(msg.sliding);
      p.crouching = Boolean(msg.crouching);
    } else {
      p.sliding = false;
      p.crouching = false;
    }
    p.reloading = Boolean(msg.reloading);
    p.yaw = Number(msg.yaw) || 0;
    p.pitch = Number(msg.pitch) || 0;
    return;
  }

  if (msg.type === 'startHealItem') {
    const rule = getCurrentRule();
    if (!rule.allowMedkits || matchOver) return;
    if (!p.alive || p.healing || p.medkits <= 0 || p.hp >= 100) return;

    cancelHostHeal(p);
    p.healing = true;
    p.sliding = false;
    p.crouching = false;

    sendToPlayerFromHost(senderId, {
      type: 'healStarted',
      duration: MEDKIT_DURATION_MS
    });

    p.healTimer = setTimeout(() => {
      p.healTimer = null;
      if (!hostPlayers[senderId] || !p.alive || matchOver) {
        p.healing = false;
        return;
      }
      p.healing = false;
      p.medkits = Math.max(0, p.medkits - 1);
      const actualHeal = Math.min(MEDKIT_HEAL_AMOUNT, 100 - p.hp);
      p.hp += actualHeal;

      sendToPlayerFromHost(senderId, {
        type: 'healed',
        hp: p.hp,
        amount: actualHeal,
        reason: 'medkit',
        medkits: p.medkits
      });
    }, MEDKIT_DURATION_MS);
    return;
  }

  if (msg.type === 'shoot') {
    if (!p.alive || p.healing || matchOver || !msg.origin || !Array.isArray(msg.rays)) return;
    const rule = getCurrentRule();
    const weapon = WEAPONS[rule.lockedWeapon || msg.weaponId] || WEAPONS.ar;
    const origin = msg.origin;
    const map = getCurrentMap();

    const raysToProcess = msg.rays.slice(0, weapon.pellets);
    const rayResults = [];
    const hitsByTarget = new Map();

    for (const rawDir of raysToProcess) {
      if (!rawDir) continue;
      const len = Math.hypot(rawDir.x, rawDir.y, rawDir.z);
      if (len < 1e-6) continue;
      const normDir = { x: rawDir.x / len, y: rawDir.y / len, z: rawDir.z / len };

      let maxDist = 115;
      for (const obs of map.obstacles) {
        const dist = intersectRayAABB(origin, normDir, obs);
        if (dist !== null && dist < maxDist) {
          maxDist = dist;
        }
      }

      if (normDir.y < -1e-5 && origin.y > 0) {
        const floorDist = -origin.y / normDir.y;
        if (floorDist > 0 && floorDist < maxDist) {
          maxDist = floorDist;
        }
      }

      let hitPlayer = null;
      let hitPart = null;
      let closestDist = maxDist;

      for (const id in hostPlayers) {
        if (id === senderId) continue;
        const target = hostPlayers[id];
        if (!target.alive) continue;
        if (rule.teamMode && target.team && target.team === p.team) continue;

        const headBox = target.sliding
          ? { x: target.x, y: target.y + 0.96, z: target.z, w: 0.5, h: 0.44, d: 0.5 }
          : target.crouching
            ? { x: target.x, y: target.y + 1.18, z: target.z, w: 0.5, h: 0.46, d: 0.5 }
            : { x: target.x, y: target.y + 1.7, z: target.z, w: 0.5, h: 0.5, d: 0.5 };
        const headDist = intersectRayAABB(origin, normDir, headBox);
        if (headDist !== null && headDist < closestDist) {
          closestDist = headDist;
          hitPlayer = target;
          hitPart = 'head';
        }

        const bodyBox = target.sliding
          ? { x: target.x, y: target.y + 0.37, z: target.z, w: 0.85, h: 0.74, d: 0.85 }
          : target.crouching
            ? { x: target.x, y: target.y + 0.48, z: target.z, w: 0.8, h: 0.96, d: 0.65 }
            : { x: target.x, y: target.y + 0.725, z: target.z, w: 0.8, h: 1.45, d: 0.6 };
        const bodyDist = intersectRayAABB(origin, normDir, bodyBox);
        if (bodyDist !== null && bodyDist < closestDist) {
          closestDist = bodyDist;
          hitPlayer = target;
          hitPart = 'body';
        }
      }

      const endPoint = {
        x: origin.x + normDir.x * closestDist,
        y: origin.y + normDir.y * closestDist,
        z: origin.z + normDir.z * closestDist
      };

      const isHeadshot = hitPart === 'head';
      rayResults.push({ end: endPoint, hit: !!hitPlayer, isHeadshot, dir: normDir });

      if (hitPlayer) {
        let dmg = 0;
        let blockedBody = false;
        if (rule.id === 'headshot' && !isHeadshot) {
          dmg = 0;
          blockedBody = true;
        } else if (rule.id === 'sniper') {
          dmg = isHeadshot ? 150 : 100;
        } else {
          dmg = isHeadshot ? weapon.headDmg : weapon.bodyDmg;
        }

        const prev = hitsByTarget.get(hitPlayer.id) || {
          target: hitPlayer,
          totalDamage: 0,
          anyHeadshot: false,
          blockedBodyOnly: false,
          hitPos: endPoint
        };
        prev.totalDamage += dmg;
        prev.anyHeadshot = prev.anyHeadshot || isHeadshot;
        if (blockedBody) prev.blockedBodyOnly = true;
        hitsByTarget.set(hitPlayer.id, prev);
      }
    }

    broadcastFromHost({
      type: 'shotEffect',
      shooterId: senderId,
      weaponId: weapon.id,
      start: origin,
      rays: rayResults
    });

    for (const hitInfo of hitsByTarget.values()) {
      const target = hitInfo.target;
      if (hitInfo.totalDamage <= 0) {
        if (hitInfo.blockedBodyOnly) {
          sendToPlayerFromHost(senderId, { type: 'bodyImmune' });
        }
        continue;
      }

      target.hp -= hitInfo.totalDamage;
      const isKill = target.hp <= 0;

      sendToPlayerFromHost(senderId, {
        type: 'hitConfirm',
        damage: hitInfo.totalDamage,
        isHeadshot: hitInfo.anyHeadshot,
        isKill,
        hitPos: hitInfo.hitPos
      });

      sendToPlayerFromHost(target.id, {
        type: 'damaged',
        hp: Math.max(0, target.hp),
        damage: hitInfo.totalDamage,
        attackerPos: { x: p.x, y: p.y, z: p.z }
      });

      if (isKill) {
        target.hp = 0;
        target.alive = false;
        target.crouching = false;
        target.sliding = false;
        target.reloading = false;
        cancelHostHeal(target);
        target.deaths += 1;
        p.kills += 1;
        if (rule.teamMode && p.team) {
          teamScores[p.team] = (teamScores[p.team] || 0) + 1;
        }

        if (p.alive) {
          const actualKillHeal = Math.min(KILL_HEAL_AMOUNT, 100 - p.hp);
          p.hp += actualKillHeal;
          sendToPlayerFromHost(senderId, {
            type: 'healed',
            hp: p.hp,
            amount: actualKillHeal,
            reason: 'kill'
          });
        }

        broadcastFromHost({
          type: 'killFeed',
          killerName: p.name,
          victimName: target.name,
          weaponName: weapon.shortName,
          isHeadshot: hitInfo.anyHeadshot
        });

        sendToPlayerFromHost(target.id, {
          type: 'playerDied',
          killerName: p.name,
          weaponName: weapon.name,
          isHeadshot: hitInfo.anyHeadshot,
          respawnTime: RESPAWN_SECONDS
        });

        const reachedGoal = rule.teamMode
          ? teamScores[p.team] >= rule.targetKills
          : p.kills >= rule.targetKills;

        if (reachedGoal && !matchOver) {
          hostTriggerMatchOver(p.name, p.team);
        } else {
          const deadId = target.id;
          target.respawnTimer = setTimeout(() => {
            const respTarget = hostPlayers[deadId];
            if (!respTarget || matchOver) return;
            respTarget.respawnTimer = null;
            const sp = getRandomSpawn(currentMapId);
            respTarget.x = sp.x;
            respTarget.y = sp.y;
            respTarget.z = sp.z;
            respTarget.hp = 100;
            respTarget.alive = true;
            respTarget.crouching = false;
            respTarget.sliding = false;
            respTarget.healing = false;
            respTarget.reloading = false;
            respTarget.medkits = rule.allowMedkits ? INITIAL_MEDKITS : 0;
            sendToPlayerFromHost(deadId, {
              type: 'respawn',
              x: respTarget.x,
              y: respTarget.y,
              z: respTarget.z,
              hp: respTarget.hp,
              medkits: respTarget.medkits,
              team: respTarget.team
            });
          }, RESPAWN_SECONDS * 1000);
        }
      }
    }
  }
}

function hostTick() {
  const now = Date.now();
  const allow = getCurrentRule().allowMedkits;

  if (allow && !matchOver) {
    for (let i = 0; i < hostPickups.length; i++) {
      const pk = hostPickups[i];
      if (!pk.active && now >= pk.respawnAt) {
        pk.active = true;
        broadcastFromHost({ type: 'pickupState', index: i, active: true });
      }
      if (pk.active) {
        for (const id in hostPlayers) {
          const p = hostPlayers[id];
          if (!p.alive || p.medkits >= MAX_MEDKITS) continue;
          const distSq = (p.x - pk.x) ** 2 + (p.y - pk.y) ** 2 + (p.z - pk.z) ** 2;
          if (distSq < 1.9) {
            pk.active = false;
            pk.respawnAt = now + PICKUP_RESPAWN_MS;
            p.medkits += 1;
            sendToPlayerFromHost(id, { type: 'medkitPicked', medkits: p.medkits });
            broadcastFromHost({ type: 'pickupState', index: i, active: false });
            break;
          }
        }
      }
    }
  }

  broadcastFromHost({
    type: 'stateUpdate',
    ruleId: currentRuleId,
    teamScores,
    matchOver,
    players: serializePlayersForNet()
  });
}

// ==========================================
// クライアント側メッセージ受信処理
// ==========================================
function applyRemotePlayerVisualUpdates(p) {
  const existing = otherPlayers[p.id];
  const needsFullRebuild =
    !existing ||
    existing.avatarStyle !== p.avatarStyle ||
    existing.avatarColor !== p.avatarColor ||
    existing.team !== (p.team || null);

  if (needsFullRebuild) {
    if (existing) {
      disposeGroup(existing.group);
      scene.remove(existing.group);
    }
    otherPlayers[p.id] = createPlayerMesh(p);
    return;
  }

  const op = existing;
  op.targetPos.set(p.x, p.y, p.z);
  op.targetYaw = p.yaw;
  op.crouching = Boolean(p.crouching);
  op.sliding = Boolean(p.sliding);
  op.healing = Boolean(p.healing);
  op.reloading = Boolean(p.reloading);
  op.group.visible = p.alive;
  op.healAura.visible = p.alive && op.healing;

  if (op.weaponId !== p.weaponId && WEAPONS[p.weaponId]) {
    op.weaponId = p.weaponId;
    disposeGroup(op.thirdPersonWeaponHolder);
    op.thirdPersonWeaponHolder.add(buildWeaponGeometryGroup(p.weaponId, 0.72));
  }

  if (op.hp !== p.hp || op.name !== p.name) {
    op.hp = p.hp;
    op.name = p.name;
    drawNameSpriteCanvas(op.nameCanvas, p.name, p.hp, p.team);
    op.nameTexture.needsUpdate = true;
  }
}

function handleServerMessage(msg) {
  if (msg.type === 'init') {
    myId = msg.id;
    if (msg.ruleId && RULES[msg.ruleId]) {
      currentRuleId = msg.ruleId;
      ruleSelect.value = currentRuleId;
      ingameRuleSelect.value = currentRuleId;
    }
    if (msg.teamScores) teamScores = msg.teamScores;
    matchOver = Boolean(msg.matchOver);

    if (msg.mapId && msg.mapId !== currentMapId) {
      loadMap(msg.mapId);
    }
    if (Array.isArray(msg.pickups)) {
      msg.pickups.forEach((active, i) => {
        if (pickupMeshes[i]) pickupMeshes[i].visible = active;
      });
    }
    Object.assign(latestPlayersSnapshot, msg.players || {});
    updateMatchBannerUI();

    const me = msg.players[myId];
    if (me) {
      resetLocalPlayerForSpawn(me.x, me.y, me.z, me.hp, me.medkits, me.team);
    }
    return;
  }

  if (msg.type === 'matchReset') {
    victoryScreen.style.display = 'none';
    matchOver = false;
    playerState.killStreak = 0;
    playerState.multiKillCount = 0;
    if (msg.ruleId && RULES[msg.ruleId]) {
      currentRuleId = msg.ruleId;
      ruleSelect.value = currentRuleId;
      ingameRuleSelect.value = currentRuleId;
    }
    if (msg.teamScores) teamScores = msg.teamScores;
    loadMap(msg.mapId);
    if (Array.isArray(msg.pickups)) {
      msg.pickups.forEach((active, i) => {
        if (pickupMeshes[i]) pickupMeshes[i].visible = active;
      });
    }
    for (const k in latestPlayersSnapshot) delete latestPlayersSnapshot[k];
    Object.assign(latestPlayersSnapshot, msg.players || {});
    for (const id in msg.players) {
      if (id !== myId) applyRemotePlayerVisualUpdates(msg.players[id]);
    }
    updateMatchBannerUI();

    const me = msg.players[myId];
    if (me) {
      resetLocalPlayerForSpawn(me.x, me.y, me.z, me.hp, me.medkits, me.team);
    }
    showToast(`${getCurrentMap().name} / ${getCurrentRule().name} 開始！`);
    return;
  }

  if (msg.type === 'matchOver') {
    matchOver = true;
    matchEndTime = performance.now() + msg.restartIn * 1000;
    playerState.isAiming = false;
    playerState.isFiring = false;
    sniperScope.style.display = 'none';
    deathScreen.style.display = 'none';

    if (msg.winnerTeam) {
      const isRed = msg.winnerTeam === 'red';
      victoryTitle.textContent = isRed ? 'TEAM RED VICTORY!' : 'TEAM BLUE VICTORY!';
      victoryTitle.style.color = isRed ? '#f87171' : '#60a5fa';
      victorySubtitle.textContent = `${msg.ruleName} — 最終トドメ: ${msg.winnerName}`;
    } else {
      victoryTitle.textContent = `${msg.winnerName} WIN!`;
      victoryTitle.style.color = '#facc15';
      victorySubtitle.textContent = `${msg.ruleName} 目標キル数達成！`;
    }
    victoryScreen.style.display = 'flex';
    SoundFX.kill();
    return;
  }

  if (msg.type === 'pickupState') {
    if (pickupMeshes[msg.index]) {
      pickupMeshes[msg.index].visible = msg.active;
    }
    return;
  }

  if (msg.type === 'medkitPicked') {
    playerState.medkits = msg.medkits;
    updateMedkitUI();
    SoundFX.healStart();
    showToast(`MEDKIT を拾いました (所持: ${msg.medkits})`);
    return;
  }

  if (msg.type === 'stateUpdate') {
    if (msg.ruleId && RULES[msg.ruleId]) currentRuleId = msg.ruleId;
    if (msg.teamScores) teamScores = msg.teamScores;
    matchOver = Boolean(msg.matchOver);

    const serverPlayers = msg.players;
    const activeIds = new Set(Object.keys(serverPlayers));
    playerCountEl.textContent = activeIds.size;

    for (const id in latestPlayersSnapshot) {
      if (!activeIds.has(id)) delete latestPlayersSnapshot[id];
    }
    Object.assign(latestPlayersSnapshot, serverPlayers);

    updateMatchBannerUI();
    if (scoreboard.style.display === 'block') {
      renderScoreboard();
    }

    for (const id in otherPlayers) {
      if (!activeIds.has(id)) {
        disposeGroup(otherPlayers[id].group);
        scene.remove(otherPlayers[id].group);
        delete otherPlayers[id];
      }
    }

    for (const id in serverPlayers) {
      const p = serverPlayers[id];
      if (id === myId) {
        killsVal.textContent = p.kills;
        deathsVal.textContent = p.deaths;
        kdVal.textContent = p.deaths > 0 ? (p.kills / p.deaths).toFixed(2) : p.kills.toFixed(2);
        if (p.team !== playerState.team) updateTeamBadgeUI(p.team);
        continue;
      }
      applyRemotePlayerVisualUpdates(p);
    }
    return;
  }

  if (msg.type === 'playerDisconnected') {
    delete latestPlayersSnapshot[msg.id];
    if (otherPlayers[msg.id]) {
      disposeGroup(otherPlayers[msg.id].group);
      scene.remove(otherPlayers[msg.id].group);
      delete otherPlayers[msg.id];
    }
    updateMatchBannerUI();
    return;
  }

  if (msg.type === 'shotEffect') {
    if (msg.shooterId && otherPlayers[msg.shooterId]) {
      otherPlayers[msg.shooterId].lastShotAt = performance.now();
    }
    const w = WEAPONS[msg.weaponId] || WEAPONS.ar;
    const rays = msg.rays || [];
    for (const r of rays) {
      spawnTracer(msg.start, r.end, r.hit, w.tracerColor);
      spawnImpactParticles(r.end, r.hit, r.isHeadshot);
      if (!r.hit && r.dir) {
        spawnBulletHole(r.end, r.dir);
      }
    }
    return;
  }

  if (msg.type === 'bodyImmune') {
    spawnDamagePopup('HS ONLY', 'immune');
    return;
  }

  if (msg.type === 'hitConfirm') {
    SoundFX.hit(msg.isHeadshot);
    if (msg.isKill) {
      SoundFX.kill();
      const nowPerf = performance.now();
      playerState.killStreak += 1;
      playerState.multiKillCount = nowPerf - playerState.lastKillAt < 4500 ? playerState.multiKillCount + 1 : 1;
      playerState.lastKillAt = nowPerf;
      if (playerState.multiKillCount === 2) showStreakBanner('DOUBLE KILL!');
      else if (playerState.multiKillCount === 3) showStreakBanner('TRIPLE KILL!');
      else if (playerState.multiKillCount >= 4) showStreakBanner(`${playerState.multiKillCount}x MULTI KILL!`);
      else if (playerState.killStreak >= 3) showStreakBanner(`${playerState.killStreak} KILL STREAK!`);
    }

    hitmarker.classList.remove('active', 'headshot', 'kill');
    void hitmarker.offsetWidth;
    hitmarker.classList.add('active');
    if (msg.isHeadshot) hitmarker.classList.add('headshot');
    if (msg.isKill) hitmarker.classList.add('kill');
    setTimeout(() => hitmarker.classList.remove('active', 'headshot', 'kill'), 160);

    const dmgLabel = msg.isKill
      ? `-${msg.damage} KILL!`
      : msg.isHeadshot
        ? `-${msg.damage} HS!`
        : `-${msg.damage}`;
    const variant = msg.isKill ? 'kill' : msg.isHeadshot ? 'headshot' : '';
    spawnDamagePopup(dmgLabel, variant);
    return;
  }

  if (msg.type === 'damaged') {
    updateHpUI(msg.hp);
    SoundFX.damaged();

    damageFlash.style.opacity = String(Math.min(0.95, 0.45 + (msg.damage || 25) / 100));
    setTimeout(() => { damageFlash.style.opacity = '0'; }, 140);

    playerState.cameraShake = Math.min(0.08, playerState.cameraShake + 0.04);
    if (msg.attackerPos) {
      playerState.lastAttackerPos = msg.attackerPos;
      playerState.dmgIndicatorTimer = 1.0;
    }
    return;
  }

  if (msg.type === 'healStarted') {
    playerState.isHealing = true;
    playerState.isSliding = false;
    playerState.crouchToggle = false;
    playerState.isCrouching = false;
    playerState.isAiming = false;
    playerState.isFiring = false;
    playerState.slideTimer = 0;
    playerState.healEndTime = performance.now() + msg.duration;
    cancelLocalReload();
    sniperScope.style.display = 'none';
    gunGroup.visible = true;
    crosshair.style.opacity = '1';
    healChannelBox.style.display = 'block';
    updatePostureUI();
    SoundFX.healStart();
    return;
  }

  if (msg.type === 'healed') {
    playerState.isHealing = false;
    healChannelBox.style.display = 'none';
    if (typeof msg.medkits === 'number') {
      playerState.medkits = msg.medkits;
      updateMedkitUI();
    }
    updateHpUI(msg.hp);

    if (msg.amount > 0) {
      healFlash.style.opacity = '1';
      setTimeout(() => { healFlash.style.opacity = '0'; }, 240);
      const reasonText = msg.reason === 'kill' ? 'KILL HEAL' : 'MEDKIT';
      spawnDamagePopup(`+${msg.amount} HP (${reasonText})`, 'heal');
    } else if (msg.reason === 'kill') {
      spawnDamagePopup('MAX HP (KILL)', 'heal');
    }
    if (msg.reason === 'medkit') {
      SoundFX.healComplete();
    }
    return;
  }

  if (msg.type === 'playerDied') {
    playerState.alive = false;
    playerState.isHealing = false;
    playerState.isSliding = false;
    playerState.crouchToggle = false;
    playerState.isCrouching = false;
    playerState.isAiming = false;
    playerState.isFiring = false;
    playerState.killStreak = 0;
    playerState.multiKillCount = 0;
    cancelLocalReload();
    gunGroup.visible = false;
    sniperScope.style.display = 'none';
    crosshair.style.opacity = '1';
    healChannelBox.style.display = 'none';
    updatePostureUI();

    const sec = msg.respawnTime || RESPAWN_SECONDS;
    playerState.respawnDuration = sec * 1000;
    playerState.respawnEndTime = performance.now() + playerState.respawnDuration;

    const hs = msg.isHeadshot ? ' [HS]' : '';
    deathMsg.textContent = `${msg.killerName} (${msg.weaponName}${hs}) に倒されました`;
    deathCountdown.textContent = `${sec.toFixed(1)}s`;
    deathProgressFill.style.width = '100%';
    deathScreen.style.display = 'flex';
    return;
  }

  if (msg.type === 'respawn') {
    resetLocalPlayerForSpawn(msg.x, msg.y, msg.z, msg.hp, msg.medkits ?? INITIAL_MEDKITS, msg.team);
    return;
  }

  if (msg.type === 'killFeed') {
    const entry = document.createElement('div');
    entry.className = 'kill-entry';
    const hsHtml = msg.isHeadshot ? '<span class="kill-hs">[HS]</span>' : '';
    const wpnHtml = msg.weaponName ? `<span class="kill-wpn">[${escapeHtml(msg.weaponName)}]</span>` : '';
    entry.innerHTML = `${escapeHtml(msg.killerName)}${wpnHtml}🔫 ${escapeHtml(msg.victimName)}${hsHtml}`;
    killFeed.appendChild(entry);
    setTimeout(() => entry.remove(), 5000);
  }
}

// ==========================================
// ルーム作成・参加フロー（PeerJS）
// ==========================================
function enterReadyUI(code) {
  currentRoomCode = code;
  roomCodeDisplay.textContent = code;
  roomHudCode.textContent = code;
  lobbySection.style.display = 'none';
  readySection.style.display = 'block';
  hostMapControls.style.display = isHost ? 'block' : 'none';
  setStatus('接続完了！「クリックしてプレイ」で開始できます。');
}

createRoomBtn.addEventListener('click', () => {
  ensureAudio();
  if (typeof Peer === 'undefined') {
    setStatus('通信ライブラリの読み込みに失敗しました。ページを再読み込みしてください。', true);
    return;
  }
  const selectedMap = mapSelect.value;
  const selectedRule = ruleSelect.value;
  currentRuleId = RULES[selectedRule] ? selectedRule : 'ffa';
  teamScores = { red: 0, blue: 0 };
  matchOver = false;
  ingameRuleSelect.value = currentRuleId;

  loadMap(selectedMap);
  initHostPickups(selectedMap);

  const code = generateRoomCode();
  const hostPeerId = PEER_PREFIX + code;
  createRoomBtn.disabled = true;
  joinRoomBtn.disabled = true;
  setStatus('ルームを作成中...');

  peer = new Peer(hostPeerId, PEER_CONFIG);

  peer.on('open', (id) => {
    isHost = true;
    isConnected = true;
    myId = id;
    hostAddPlayer(id, {
      name: nameInput.value.trim() || 'Host',
      avatarStyle: selectedAvatarStyle,
      avatarColor: selectedAvatarColor
    });
    enterReadyUI(code);

    hostTickTimer = setInterval(hostTick, 50);
  });

  peer.on('connection', (conn) => {
    conn.on('open', () => {
      guestConns.set(conn.peer, conn);
    });
    conn.on('data', (data) => {
      handleHostReceive(conn.peer, data);
    });
    const cleanup = () => {
      guestConns.delete(conn.peer);
      if (hostPlayers[conn.peer]) {
        cancelHostHeal(hostPlayers[conn.peer]);
        if (hostPlayers[conn.peer].respawnTimer) {
          clearTimeout(hostPlayers[conn.peer].respawnTimer);
        }
        delete hostPlayers[conn.peer];
        broadcastFromHost({ type: 'playerDisconnected', id: conn.peer });
      }
    };
    conn.on('close', cleanup);
    conn.on('error', cleanup);
  });

  peer.on('error', (err) => {
    console.error('Peer error:', err);
    createRoomBtn.disabled = false;
    joinRoomBtn.disabled = false;
    setStatus(`エラーが発生しました (${err.type})。もう一度お試しください。`, true);
  });
});

joinRoomBtn.addEventListener('click', () => {
  ensureAudio();
  if (typeof Peer === 'undefined') {
    setStatus('通信ライブラリの読み込みに失敗しました。', true);
    return;
  }
  const code = roomCodeInput.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!code) {
    setStatus('ルームコードを入力してください。', true);
    return;
  }

  createRoomBtn.disabled = true;
  joinRoomBtn.disabled = true;
  setStatus(`ルーム ${code} に接続中...`);

  peer = new Peer(PEER_CONFIG);

  peer.on('open', (id) => {
    myId = id;
    hostConn = peer.connect(PEER_PREFIX + code, { reliable: true });

    const timeout = setTimeout(() => {
      if (!isConnected) {
        setStatus('ルームが見つかりません。コードを確認してください。', true);
        createRoomBtn.disabled = false;
        joinRoomBtn.disabled = false;
        peer.destroy();
      }
    }, 10000);

    hostConn.on('open', () => {
      clearTimeout(timeout);
      isHost = false;
      isConnected = true;
      hostConn.send({
        type: 'join',
        name: nameInput.value.trim() || `Player_${id.slice(-4)}`,
        avatarStyle: selectedAvatarStyle,
        avatarColor: selectedAvatarColor
      });
      enterReadyUI(code);
    });

    hostConn.on('data', (data) => {
      handleServerMessage(data);
    });

    hostConn.on('close', () => {
      isConnected = false;
      document.exitPointerLock?.();
      overlay.style.display = 'flex';
      setStatus('ホストとの接続が切れました。ページを再読み込みしてください。', true);
    });
  });

  peer.on('error', (err) => {
    console.error('Peer error:', err);
    createRoomBtn.disabled = false;
    joinRoomBtn.disabled = false;
    setStatus(`接続エラー (${err.type})。ルームコードを確認してください。`, true);
  });
});

applyMapBtn.addEventListener('click', () => {
  if (!isHost || !isConnected) return;
  const nextMap = ingameMapSelect.value;
  const nextRule = ingameRuleSelect.value;
  hostResetMatch(nextMap, nextRule);
  setStatus(`「${MAPS[nextMap].name} / ${RULES[nextRule].name}」を適用しました。`);
});

copyInviteBtn.addEventListener('click', async () => {
  const inviteUrl = new URL(window.location.href);
  inviteUrl.searchParams.set('room', currentRoomCode);
  try {
    await navigator.clipboard.writeText(inviteUrl.toString());
    copyInviteBtn.textContent = 'コピーしました！';
    setTimeout(() => { copyInviteBtn.textContent = '招待URLをコピー'; }, 2000);
  } catch {
    prompt('以下のURLをコピーして友達に送ってください:', inviteUrl.toString());
  }
});

// ==========================================
// 入力・射撃・ADS・武器切替・しゃがみ・スライディング・回復
// ==========================================
const keys = {};
let isPointerLocked = false;

function tryStartSlide() {
  if (!isPointerLocked || !isConnected || !playerState.alive || playerState.isHealing || matchOver) return;
  if (!playerState.onGround || playerState.isSliding || playerState.slideCooldown > 0) return;

  const forward = new THREE.Vector3(-Math.sin(playerState.yaw), 0, -Math.cos(playerState.yaw));
  const right = new THREE.Vector3(Math.cos(playerState.yaw), 0, -Math.sin(playerState.yaw));
  const dir = new THREE.Vector3();
  if (keys['KeyW']) dir.add(forward);
  if (keys['KeyS']) dir.sub(forward);
  if (keys['KeyD']) dir.add(right);
  if (keys['KeyA']) dir.sub(right);

  if (dir.lengthSq() === 0) return;
  dir.normalize();

  playerState.isSliding = true;
  playerState.isCrouching = false;
  playerState.slideTimer = SLIDE_DURATION;
  playerState.slideCooldown = SLIDE_COOLDOWN;
  playerState.slideDir.copy(dir);
  SoundFX.slide();
}

function tryUseMedkit() {
  if (!isPointerLocked || !isConnected || !playerState.alive || playerState.isHealing || matchOver) return;
  if (!getCurrentRule().allowMedkits) {
    showToast('このルールでは回復アイテムを使用できません');
    return;
  }
  if (playerState.medkits <= 0) {
    showToast('回復アイテムがありません');
    return;
  }
  if (playerState.hp >= 100) {
    showToast('HPはすでに満タンです');
    return;
  }
  sendToHost({ type: 'startHealItem' });
}

window.addEventListener('contextmenu', (e) => e.preventDefault());

window.addEventListener('keydown', (e) => {
  keys[e.code] = true;

  if (e.code === 'Tab' && isConnected) {
    e.preventDefault();
    scoreboard.style.display = 'block';
    renderScoreboard();
  }

  if (e.code === 'KeyR' && isPointerLocked && playerState.alive && !playerState.isHealing && !matchOver) {
    startReload();
  }

  if (e.code === 'KeyC' && !e.repeat && isPointerLocked && isConnected && playerState.alive && !playerState.isHealing && !matchOver) {
    if (!playerState.isSliding) {
      playerState.crouchToggle = !playerState.crouchToggle;
    }
  }

  if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && !e.repeat) {
    tryStartSlide();
  }

  if (e.code === 'KeyE' && !e.repeat) {
    tryUseMedkit();
  }

  if (isPointerLocked && isConnected && playerState.alive && !playerState.isHealing && !matchOver) {
    if (e.code === 'Digit1') switchWeapon('ar');
    else if (e.code === 'Digit2') switchWeapon('smg');
    else if (e.code === 'Digit3') switchWeapon('shotgun');
    else if (e.code === 'Digit4') switchWeapon('sniper');
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.code] = false;
  if (e.code === 'Tab') {
    scoreboard.style.display = 'none';
  }
});

window.addEventListener('wheel', (e) => {
  if (!isPointerLocked || !isConnected || !playerState.alive || playerState.isHealing || matchOver) return;
  if (getCurrentRule().lockedWeapon) return;
  const idx = WEAPON_ORDER.indexOf(playerState.weaponId);
  const delta = e.deltaY > 0 ? 1 : -1;
  const nextIdx = (idx + delta + WEAPON_ORDER.length) % WEAPON_ORDER.length;
  switchWeapon(WEAPON_ORDER[nextIdx]);
});

playBtn.addEventListener('click', () => {
  if (!isConnected) return;
  ensureAudio();
  document.body.requestPointerLock();
});

document.addEventListener('pointerlockchange', () => {
  isPointerLocked = document.pointerLockElement === document.body;
  overlay.style.display = isPointerLocked ? 'none' : 'flex';
  if (!isPointerLocked) {
    scoreboard.style.display = 'none';
    playerState.isAiming = false;
    playerState.isFiring = false;
    playerState.crouchToggle = false;
    playerState.isCrouching = false;
    sniperScope.style.display = 'none';
    gunGroup.visible = playerState.alive;
    crosshair.style.opacity = '1';
    updatePostureUI();
  }
});

document.addEventListener('mousemove', (e) => {
  if (!isPointerLocked || !playerState.alive || matchOver) return;
  const weapon = getActiveWeapon();
  const adsMult = THREE.MathUtils.lerp(1.0, weapon.adsSensMult, playerState.adsBlend);
  const sensitivity = 0.0022 * mouseSensitivity * adsMult;
  playerState.yaw -= e.movementX * sensitivity;
  playerState.pitch -= e.movementY * sensitivity;
  playerState.pitch = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, playerState.pitch));

  // 銃のマウス追従スウェイ
  playerState.swayX = THREE.MathUtils.clamp(playerState.swayX - e.movementX * 0.00018, -0.028, 0.028);
  playerState.swayY = THREE.MathUtils.clamp(playerState.swayY + e.movementY * 0.00018, -0.022, 0.022);
});

document.addEventListener('mousedown', (e) => {
  if (!isPointerLocked || !playerState.alive || !isConnected || playerState.isHealing || matchOver) return;
  ensureAudio();
  if (e.button === 0) {
    playerState.isFiring = true;
    shoot();
  } else if (e.button === 2) {
    playerState.isAiming = true;
  }
});

document.addEventListener('mouseup', (e) => {
  if (e.button === 0) {
    playerState.isFiring = false;
  } else if (e.button === 2) {
    playerState.isAiming = false;
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function startReload() {
  const weapon = getActiveWeapon();
  const currentAmmo = playerState.weaponAmmo[weapon.id] ?? weapon.mag;
  if (playerState.isReloading || playerState.isHealing || currentAmmo === weapon.mag) return;

  cancelLocalReload();
  playerState.isAiming = false;
  playerState.isFiring = false;
  playerState.isReloading = true;
  playerState.reloadStartTime = performance.now();
  playerState.reloadDuration = getEffectiveReloadMs(weapon);

  reloadStatus.textContent = 'RELOADING...';
  reloadBarBg.style.display = 'block';
  reloadBarFill.style.width = '0%';
  centerReloadRing.style.display = 'block';
  centerReloadFill.style.width = '0%';

  // 段階別リロード効果音スケジュール
  const d = playerState.reloadDuration;
  playerState.reloadSoundTimers.push(
    setTimeout(() => { if (playerState.isReloading) SoundFX.reloadOut(); }, d * 0.12),
    setTimeout(() => { if (playerState.isReloading) SoundFX.reloadIn(); }, d * 0.62),
    setTimeout(() => { if (playerState.isReloading) SoundFX.reloadBolt(); }, d * 0.82)
  );

  playerState.reloadTimeout = setTimeout(() => {
    playerState.reloadTimeout = null;
    playerState.reloadSoundTimers = [];
    playerState.weaponAmmo[weapon.id] = weapon.mag;
    playerState.isReloading = false;
    reloadStatus.textContent = '';
    reloadBarBg.style.display = 'none';
    centerReloadRing.style.display = 'none';
    resetViewWeaponPose();
    updateAmmoUI();
  }, playerState.reloadDuration);
}

function ejectShellCasing(weaponId) {
  if (shellCasings.length >= 16) {
    const oldest = shellCasings.shift();
    scene.remove(oldest.mesh);
    oldest.mesh.geometry.dispose();
    oldest.mesh.material.dispose();
  }
  const color = weaponId === 'shotgun' ? 0xdc2626 : 0xfbbf24;
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.018, 0.018, 0.048),
    new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.8 })
  );
  const startPos = new THREE.Vector3(0.22, -0.14, -0.35).applyMatrix4(camera.matrixWorld);
  mesh.position.copy(startPos);

  const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
  const vel = new THREE.Vector3()
    .addScaledVector(right, 2.2 + Math.random() * 1.2)
    .addScaledVector(up, 1.8 + Math.random() * 0.8);

  scene.add(mesh);
  shellCasings.push({ mesh, vel, life: 0.65 });
}

function shoot() {
  const weapon = getActiveWeapon();
  const now = performance.now();
  if (playerState.isReloading || playerState.isHealing || matchOver || now - playerState.lastShotTime < weapon.fireRateMs) return;

  const ammo = playerState.weaponAmmo[weapon.id] ?? 0;
  if (ammo <= 0) {
    startReload();
    return;
  }

  playerState.lastShotTime = now;
  playerState.weaponAmmo[weapon.id] = ammo - 1;
  updateAmmoUI();

  // マズルフラッシュ & 薬莢排出 & リコイル
  muzzleFlashTimer = 0.055;
  gunGroup.position.z = -0.35 + (weapon.id === 'sniper' || weapon.id === 'shotgun' ? 0.06 : 0);
  const recoilMult = (playerState.isCrouching ? 0.7 : 1.0) * (playerState.isAiming ? 0.75 : 1.0);
  playerState.pitch = Math.min(Math.PI / 2 - 0.05, playerState.pitch + weapon.recoilPitch * recoilMult);

  SoundFX.shot(weapon.id);
  ejectShellCasing(weapon.id);

  const origin = new THREE.Vector3();
  camera.getWorldPosition(origin);
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);

  // 腰撃ち・移動・空中・スライディング・連射ブルームを統合した円形拡散
  const spread = computeCurrentSpread(weapon);
  playerState.fireBloom = Math.min(weapon.maxBloom, playerState.fireBloom + weapon.bloomPerShot);

  const rays = [];
  for (let i = 0; i < weapon.pellets; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * spread;
    const sx = Math.cos(angle) * radius;
    const sy = Math.sin(angle) * radius;
    const pelletDir = forward.clone()
      .addScaledVector(right, sx)
      .addScaledVector(up, sy)
      .normalize();
    rays.push({ x: pelletDir.x, y: pelletDir.y, z: pelletDir.z });
  }

  sendToHost({
    type: 'shoot',
    weaponId: weapon.id,
    origin: { x: origin.x, y: origin.y, z: origin.z },
    rays
  });
}

function spawnTracer(start, end, isHit, color = 0xfacc15) {
  const points = [
    new THREE.Vector3(start.x, start.y - 0.05, start.z),
    new THREE.Vector3(end.x, end.y, end.z)
  ];
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({
    color: isHit ? 0xef4444 : color,
    transparent: true,
    opacity: 0.9
  });
  const line = new THREE.Line(geo, mat);
  scene.add(line);
  tracers.push({ line, life: 0.12 });
}

function spawnImpactParticles(pos, isHit, isHeadshot) {
  const count = isHit ? 7 : 4;
  const color = isHeadshot ? 0xfacc15 : isHit ? 0xef4444 : 0x94a3b8;
  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, 0.08),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 })
    );
    mesh.position.set(pos.x, pos.y, pos.z);
    scene.add(mesh);
    impactParticles.push({
      mesh,
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        Math.random() * 4 + 1,
        (Math.random() - 0.5) * 6
      ),
      life: 0.32
    });
  }
}

function spawnBulletHole(end, rayDir) {
  const map = getCurrentMap();
  const normal = new THREE.Vector3(-rayDir.x, -rayDir.y, -rayDir.z).normalize();

  // 床や障害物AABBの最寄り面法線を求めて平らに貼る
  if (Math.abs(end.y) < 0.03) {
    normal.set(0, 1, 0);
  } else {
    for (const obs of map.obstacles) {
      const dx = Math.abs(Math.abs(end.x - obs.x) - obs.w / 2);
      const dy = Math.abs(Math.abs(end.y - obs.y) - obs.h / 2);
      const dz = Math.abs(Math.abs(end.z - obs.z) - obs.d / 2);
      const minD = Math.min(dx, dy, dz);
      if (minD < 0.05) {
        if (minD === dx) normal.set(Math.sign(end.x - obs.x) || 1, 0, 0);
        else if (minD === dy) normal.set(0, Math.sign(end.y - obs.y) || 1, 0);
        else normal.set(0, 0, Math.sign(end.z - obs.z) || 1);
        break;
      }
    }
  }

  if (bulletHoles.length >= 36) {
    const old = bulletHoles.shift();
    mapGroup.remove(old);
    old.geometry.dispose();
    old.material.dispose();
  }

  const hole = new THREE.Mesh(
    new THREE.PlaneGeometry(0.14, 0.14),
    new THREE.MeshBasicMaterial({
      color: 0x090d16,
      transparent: true,
      opacity: 0.82,
      polygonOffset: true,
      polygonOffsetFactor: -2
    })
  );
  hole.position.set(
    end.x + normal.x * 0.012,
    end.y + normal.y * 0.012,
    end.z + normal.z * 0.012
  );
  hole.lookAt(hole.position.x + normal.x, hole.position.y + normal.y, hole.position.z + normal.z);
  mapGroup.add(hole);
  bulletHoles.push(hole);
}

function checkHorizontalCollision(x, y, z, height = PLAYER_HEIGHT) {
  const map = getCurrentMap();
  for (const obs of map.obstacles) {
    const minY = obs.y - obs.h / 2;
    const maxY = obs.y + obs.h / 2;
    if (y + height <= minY || y >= maxY - 0.1) continue;

    const minX = obs.x - obs.w / 2 - PLAYER_RADIUS;
    const maxX = obs.x + obs.w / 2 + PLAYER_RADIUS;
    const minZ = obs.z - obs.d / 2 - PLAYER_RADIUS;
    const maxZ = obs.z + obs.d / 2 + PLAYER_RADIUS;

    if (x > minX && x < maxX && z > minZ && z < maxZ) {
      return true;
    }
  }
  return false;
}

function getGroundHeight(x, y, z) {
  let groundY = 0;
  const map = getCurrentMap();
  for (const obs of map.obstacles) {
    const topY = obs.y + obs.h / 2;
    const minX = obs.x - obs.w / 2 - PLAYER_RADIUS;
    const maxX = obs.x + obs.w / 2 + PLAYER_RADIUS;
    const minZ = obs.z - obs.d / 2 - PLAYER_RADIUS;
    const maxZ = obs.z + obs.d / 2 + PLAYER_RADIUS;

    if (x > minX && x < maxX && z > minZ && z < maxZ) {
      if (y >= topY - 0.25) {
        groundY = Math.max(groundY, topY);
      }
    }
  }
  return groundY;
}

// ==========================================
// メインゲームループ
// ==========================================
let lastTime = performance.now();
let lastNetSend = 0;

function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;

  // ピックアップ回転アニメ
  for (let i = 0; i < pickupMeshes.length; i++) {
    const m = pickupMeshes[i];
    if (m.visible) {
      m.rotation.y += dt * 1.8;
      const baseY = getCurrentMap().pickupSpawns[i].y + 0.55;
      m.position.y = baseY + Math.sin(now * 0.003 + i) * 0.1;
    }
  }

  // マズルフラッシュ減衰
  if (muzzleFlashTimer > 0) {
    muzzleFlashTimer = Math.max(0, muzzleFlashTimer - dt);
    const ratio = muzzleFlashTimer / 0.055;
    muzzleLight.intensity = 4.2 * ratio;
    muzzleFlashMat.opacity = 0.9 * ratio;
    muzzleFlashMesh.visible = true;
    muzzleFlashMesh.rotation.z += dt * 40;
  } else {
    muzzleLight.intensity = 0;
    muzzleFlashMat.opacity = 0;
    muzzleFlashMesh.visible = false;
  }

  // リロードモーション＆進捗バー更新
  if (playerState.isReloading) {
    const p = Math.min(1, (now - playerState.reloadStartTime) / playerState.reloadDuration);
    const pctStr = `${p * 100}%`;
    reloadBarFill.style.width = pctStr;
    centerReloadFill.style.width = pctStr;
    const remainSec = Math.max(0, (playerState.reloadDuration - (now - playerState.reloadStartTime)) / 1000);
    centerReloadText.textContent = `RELOADING ${remainSec.toFixed(1)}s`;

    // 4段階武器モーション（銃傾け -> マガジン脱着 -> ボルト操作）
    const tilt = Math.sin(p * Math.PI);
    gunModelGroup.rotation.x = -0.35 * tilt;
    gunModelGroup.rotation.z = 0.42 * tilt;
    gunModelGroup.position.y = -0.09 * tilt;

    const mag = activeViewWeaponUserData.magMesh;
    const magBase = activeViewWeaponUserData.magBasePos;
    if (mag && magBase) {
      if (p < 0.28) {
        const t = Math.max(0, (p - 0.08) / 0.2);
        mag.visible = true;
        mag.position.set(magBase.x, magBase.y - 0.28 * t, magBase.z);
      } else if (p < 0.52) {
        mag.visible = false;
      } else if (p < 0.74) {
        const t = (p - 0.52) / 0.22;
        mag.visible = true;
        mag.position.set(magBase.x, magBase.y - 0.28 * (1 - t), magBase.z);
      } else {
        mag.visible = true;
        mag.position.copy(magBase);
      }
    }

    const bolt = activeViewWeaponUserData.boltMesh;
    const boltBase = activeViewWeaponUserData.boltBasePos;
    if (bolt && boltBase) {
      if (p >= 0.78 && p <= 0.94) {
        const t = Math.sin(((p - 0.78) / 0.16) * Math.PI);
        bolt.position.set(boltBase.x, boltBase.y, boltBase.z + 0.09 * t);
      } else {
        bolt.position.copy(boltBase);
      }
    }
  }

  // 5秒回復チャネリング進捗バー更新
  if (playerState.isHealing) {
    const remainMs = Math.max(0, playerState.healEndTime - now);
    const pct = Math.min(100, ((MEDKIT_DURATION_MS - remainMs) / MEDKIT_DURATION_MS) * 100);
    healChannelTimer.textContent = `${(remainMs / 1000).toFixed(1)}s`;
    healChannelFill.style.width = `${pct}%`;
  }

  // 試合終了リザルトのカウントダウン更新
  if (matchOver && victoryScreen.style.display === 'flex') {
    const remain = Math.max(0, (matchEndTime - now) / 1000);
    victoryCountdown.textContent = `次のマッチまで ${remain.toFixed(1)}s`;
  }

  if (isConnected && playerState.alive) {
    const weapon = getActiveWeapon();

    // 射撃拡散ブルームの自然減衰
    playerState.fireBloom = Math.max(0, playerState.fireBloom - dt * 0.14);

    // フルオート射撃
    if (playerState.isFiring && weapon.auto && isPointerLocked && !playerState.isHealing && !matchOver) {
      shoot();
    }

    // ADS (右クリックエイム) ブレンド更新
    const wantAds = playerState.isAiming && isPointerLocked && !playerState.isReloading && !playerState.isHealing && !matchOver;
    playerState.adsBlend = THREE.MathUtils.lerp(playerState.adsBlend, wantAds ? 1 : 0, Math.min(1, dt * 14));

    const showScope = weapon.scoped && wantAds && playerState.adsBlend > 0.72;
    sniperScope.style.display = showScope ? 'block' : 'none';
    gunGroup.visible = !showScope;
    crosshair.style.opacity = showScope ? '0' : '1';

    // スライディングタイマー & クールダウン
    if (playerState.slideCooldown > 0) {
      playerState.slideCooldown = Math.max(0, playerState.slideCooldown - dt);
    }

    if (playerState.isSliding) {
      playerState.slideTimer -= dt;
      if (playerState.slideTimer <= 0 || playerState.isHealing || matchOver) {
        playerState.isSliding = false;
        playerState.slideTimer = 0;
      }
    }

    // しゃがみ状態更新（Cトグル or Ctrl長押し、スライド中/回復中は非しゃがみ）
    const nextCrouch =
      isPointerLocked &&
      !playerState.isSliding &&
      !playerState.isHealing &&
      !matchOver &&
      (playerState.crouchToggle || Boolean(keys['ControlLeft']));
    if (nextCrouch !== playerState.isCrouching) {
      playerState.isCrouching = nextCrouch;
    }
    updatePostureUI();

    // スライディングHUD更新
    if (playerState.isSliding) {
      slideBarFill.style.width = `${(playerState.slideTimer / SLIDE_DURATION) * 100}%`;
      slideStatusText.textContent = 'SLIDING';
      slideCard.classList.remove('ready');
    } else if (playerState.slideCooldown > 0) {
      slideBarFill.style.width = `${(1 - playerState.slideCooldown / SLIDE_COOLDOWN) * 100}%`;
      slideStatusText.textContent = `${playerState.slideCooldown.toFixed(1)}s`;
      slideCard.classList.remove('ready');
    } else {
      slideBarFill.style.width = '100%';
      slideStatusText.textContent = 'READY';
      slideCard.classList.add('ready');
    }

    // 移動ベクトルの決定
    const moveStep = new THREE.Vector3();
    const effectiveHeight = playerState.isSliding
      ? SLIDE_PLAYER_HEIGHT
      : playerState.isCrouching
        ? CROUCH_PLAYER_HEIGHT
        : PLAYER_HEIGHT;

    if (!playerState.isHealing && !matchOver) {
      if (playerState.isSliding) {
        const t = 1 - playerState.slideTimer / SLIDE_DURATION;
        const speed = THREE.MathUtils.lerp(SLIDE_INITIAL_SPEED, SLIDE_END_SPEED, t);
        moveStep.copy(playerState.slideDir).multiplyScalar(speed * dt);
      } else if (isPointerLocked) {
        const forward = new THREE.Vector3(-Math.sin(playerState.yaw), 0, -Math.cos(playerState.yaw));
        const right = new THREE.Vector3(Math.cos(playerState.yaw), 0, -Math.sin(playerState.yaw));
        if (keys['KeyW']) moveStep.add(forward);
        if (keys['KeyS']) moveStep.sub(forward);
        if (keys['KeyD']) moveStep.add(right);
        if (keys['KeyA']) moveStep.sub(right);
        if (moveStep.lengthSq() > 0) {
          const crouchMult = playerState.isCrouching ? CROUCH_MOVE_MULT : 1.0;
          const speedMult =
            weapon.moveMult *
            crouchMult *
            THREE.MathUtils.lerp(1, weapon.adsMoveMult, playerState.adsBlend);
          moveStep.normalize().multiplyScalar(MOVE_SPEED * speedMult * dt);
        }
      }

      const prevX = playerState.pos.x;
      const prevZ = playerState.pos.z;
      if (moveStep.lengthSq() > 0) {
        const nextX = playerState.pos.x + moveStep.x;
        if (!checkHorizontalCollision(nextX, playerState.pos.y, playerState.pos.z, effectiveHeight)) {
          playerState.pos.x = nextX;
        }
        const nextZ = playerState.pos.z + moveStep.z;
        if (!checkHorizontalCollision(playerState.pos.x, playerState.pos.y, nextZ, effectiveHeight)) {
          playerState.pos.z = nextZ;
        }
      }
      const actualMoved = Math.hypot(playerState.pos.x - prevX, playerState.pos.z - prevZ);
      const targetMoveRatio = dt > 0 ? Math.min(1.8, actualMoved / (MOVE_SPEED * dt)) : 0;
      playerState.moveRatio = THREE.MathUtils.lerp(playerState.moveRatio, targetMoveRatio, Math.min(1, dt * 16));

      if (isPointerLocked && keys['Space'] && playerState.onGround) {
        playerState.isSliding = false;
        playerState.slideTimer = 0;
        playerState.crouchToggle = false;
        playerState.isCrouching = false;
        playerState.vel.y = JUMP_VELOCITY;
        playerState.onGround = false;
      }
    } else {
      playerState.moveRatio = THREE.MathUtils.lerp(playerState.moveRatio, 0, Math.min(1, dt * 16));
    }

    // 重力 & 接地
    playerState.vel.y -= GRAVITY * dt;
    playerState.pos.y += playerState.vel.y * dt;

    const groundY = getGroundHeight(playerState.pos.x, playerState.pos.y, playerState.pos.z);
    if (playerState.pos.y <= groundY) {
      playerState.pos.y = groundY;
      playerState.vel.y = 0;
      playerState.onGround = true;
    }

    // 姿勢 & ADS に応じた視点高さ・FOV補間
    const targetEye = playerState.isSliding
      ? SLIDE_EYE_HEIGHT
      : playerState.isCrouching
        ? CROUCH_EYE_HEIGHT
        : EYE_HEIGHT;
    playerState.currentEyeHeight = THREE.MathUtils.lerp(playerState.currentEyeHeight, targetEye, Math.min(1, dt * 14));

    const nonAdsFov = playerState.isSliding ? SLIDE_FOV : BASE_FOV;
    const targetFov = THREE.MathUtils.lerp(nonAdsFov, weapon.adsFov, playerState.adsBlend);
    if (Math.abs(playerState.currentFov - targetFov) > 0.05) {
      playerState.currentFov = THREE.MathUtils.lerp(playerState.currentFov, targetFov, Math.min(1, dt * 14));
      camera.fov = playerState.currentFov;
      camera.updateProjectionMatrix();
    }

    const targetRoll = playerState.isSliding ? -0.055 : 0;
    playerState.cameraRoll = THREE.MathUtils.lerp(playerState.cameraRoll, targetRoll, Math.min(1, dt * 14));

    // 被弾シェイク
    let shakeX = 0;
    let shakeY = 0;
    if (playerState.cameraShake > 0.001) {
      shakeX = (Math.random() - 0.5) * playerState.cameraShake;
      shakeY = (Math.random() - 0.5) * playerState.cameraShake;
      playerState.cameraShake = THREE.MathUtils.lerp(playerState.cameraShake, 0, Math.min(1, dt * 16));
    }

    camera.position.set(
      playerState.pos.x + shakeX,
      playerState.pos.y + playerState.currentEyeHeight + shakeY,
      playerState.pos.z
    );
    camera.rotation.set(playerState.pitch, playerState.yaw, playerState.cameraRoll, 'YXZ');

    // 歩行ボブ & スウェイ減衰
    if (playerState.onGround && !playerState.isSliding && playerState.moveRatio > 0.08) {
      playerState.walkBobTime += dt * (8 + playerState.moveRatio * 4);
    }
    const bobAmp = playerState.onGround && !playerState.isSliding
      ? Math.min(1, playerState.moveRatio) * 0.011 * (1 - playerState.adsBlend * 0.8)
      : 0;
    const bobX = Math.cos(playerState.walkBobTime * 0.5) * bobAmp;
    const bobY = Math.abs(Math.sin(playerState.walkBobTime)) * bobAmp * 1.25;

    playerState.swayX = THREE.MathUtils.lerp(playerState.swayX, 0, Math.min(1, dt * 10));
    playerState.swayY = THREE.MathUtils.lerp(playerState.swayY, 0, Math.min(1, dt * 10));

    // 一人称武器の位置（腰だめ <-> ADS中央 <-> 回復中）
    const targetGunX = THREE.MathUtils.lerp(0.28, 0.0, playerState.adsBlend) + bobX + playerState.swayX;
    const targetGunY = (playerState.isHealing
      ? -0.45
      : THREE.MathUtils.lerp(-0.24, -0.155, playerState.adsBlend)) - bobY + playerState.swayY;
    const targetGunZ = THREE.MathUtils.lerp(-0.45, -0.34, playerState.adsBlend);

    gunGroup.position.x = THREE.MathUtils.lerp(gunGroup.position.x, targetGunX, Math.min(1, dt * 15));
    gunGroup.position.y = THREE.MathUtils.lerp(gunGroup.position.y, targetGunY, Math.min(1, dt * 15));
    gunGroup.position.z = THREE.MathUtils.lerp(gunGroup.position.z, targetGunZ, Math.min(1, dt * 15));
    gunGroup.rotation.z = THREE.MathUtils.lerp(
      gunGroup.rotation.z,
      playerState.isSliding ? 0.22 * (1 - playerState.adsBlend) : 0,
      Math.min(1, dt * 14)
    );

    // クロスヘアを実際の弾拡散サイズに完全連動
    const liveSpreadPx = Math.max(3, Math.min(54, computeCurrentSpread(weapon) * 420));
    playerState.crosshairSpread = THREE.MathUtils.lerp(playerState.crosshairSpread, liveSpreadPx, Math.min(1, dt * 18));
    crosshair.style.setProperty('--spread', `${playerState.crosshairSpread.toFixed(1)}px`);

    // 被弾方向インジケーター更新
    if (playerState.dmgIndicatorTimer > 0 && playerState.lastAttackerPos) {
      playerState.dmgIndicatorTimer = Math.max(0, playerState.dmgIndicatorTimer - dt);
      const dx = playerState.lastAttackerPos.x - playerState.pos.x;
      const dz = playerState.lastAttackerPos.z - playerState.pos.z;
      const fwdX = -Math.sin(playerState.yaw);
      const fwdZ = -Math.cos(playerState.yaw);
      const rightX = Math.cos(playerState.yaw);
      const rightZ = -Math.sin(playerState.yaw);
      const fwdDot = dx * fwdX + dz * fwdZ;
      const rightDot = dx * rightX + dz * rightZ;
      const deg = (Math.atan2(rightDot, fwdDot) * 180) / Math.PI;
      damageIndicator.style.transform = `rotate(${deg.toFixed(1)}deg)`;
      damageIndicator.style.opacity = String(Math.min(1, playerState.dmgIndicatorTimer * 1.3));
    } else {
      damageIndicator.style.opacity = '0';
    }

    // ミニマップ更新
    drawMinimap();

    // サーバーへ自分の状態を送信（約30Hz）
    if (now - lastNetSend > 33) {
      lastNetSend = now;
      sendToHost({
        type: 'playerMove',
        x: playerState.pos.x,
        y: playerState.pos.y,
        z: playerState.pos.z,
        yaw: playerState.yaw,
        pitch: playerState.pitch,
        crouching: playerState.isCrouching,
        sliding: playerState.isSliding,
        reloading: playerState.isReloading
      });
    }
  } else if (isConnected && !playerState.alive) {
    if (playerState.respawnEndTime > 0) {
      const remainMs = Math.max(0, playerState.respawnEndTime - now);
      deathCountdown.textContent = `${(remainMs / 1000).toFixed(1)}s`;
      const pct = playerState.respawnDuration > 0
        ? (remainMs / playerState.respawnDuration) * 100
        : 0;
      deathProgressFill.style.width = `${pct}%`;
    }
    camera.position.set(playerState.pos.x, playerState.pos.y + 0.55, playerState.pos.z);
    camera.rotation.set(-0.22, playerState.yaw, 0.28, 'YXZ');
    if (Math.abs(playerState.currentFov - BASE_FOV) > 0.1) {
      playerState.currentFov = BASE_FOV;
      camera.fov = BASE_FOV;
      camera.updateProjectionMatrix();
    }
    drawMinimap();
  } else if (!isConnected) {
    const t = now * 0.0002;
    camera.position.set(Math.cos(t) * 17, 7, Math.sin(t) * 17);
    camera.lookAt(0, 1.5, 0);
  }

  // 他プレイヤーの線形補間（Lerp）＆ 歩行・しゃがみ・スライディング・リロード姿勢
  const lerpFactor = Math.min(1, dt * 15);
  for (const id in otherPlayers) {
    const op = otherPlayers[id];
    const prevX = op.group.position.x;
    const prevZ = op.group.position.z;

    op.group.position.lerp(op.targetPos, lerpFactor);

    const movedDist = Math.hypot(op.group.position.x - prevX, op.group.position.z - prevZ);
    const moveSpeedEstimate = dt > 0 ? movedDist / dt : 0;

    let diff = op.targetYaw - op.group.rotation.y;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    op.group.rotation.y += diff * lerpFactor;

    const targetBodyY = op.sliding ? -0.35 : op.crouching ? -0.3 : 0;
    const targetBodyRotX = op.sliding ? 0.55 : op.crouching ? -0.14 : 0;
    const targetLegScaleY = op.crouching && !op.sliding ? 0.68 : 1.0;
    const targetNameY = op.sliding ? 1.7 : op.crouching ? 1.92 : 2.42;

    op.bodyGroup.position.y = THREE.MathUtils.lerp(op.bodyGroup.position.y, targetBodyY, lerpFactor);
    op.bodyGroup.rotation.x = THREE.MathUtils.lerp(op.bodyGroup.rotation.x, targetBodyRotX, lerpFactor);
    op.leftLegPivot.scale.y = THREE.MathUtils.lerp(op.leftLegPivot.scale.y, targetLegScaleY, lerpFactor);
    op.rightLegPivot.scale.y = THREE.MathUtils.lerp(op.rightLegPivot.scale.y, targetLegScaleY, lerpFactor);
    op.nameSprite.position.y = THREE.MathUtils.lerp(op.nameSprite.position.y, targetNameY, lerpFactor);

    if (!op.sliding && moveSpeedEstimate > 0.6) {
      op.walkPhase += dt * (op.crouching ? 8 : 12);
      const swing = Math.sin(op.walkPhase) * (op.crouching ? 0.35 : 0.55);
      op.leftLegPivot.rotation.x = swing;
      op.rightLegPivot.rotation.x = -swing;
      op.leftArmPivot.rotation.x = -swing * 0.6;
    } else {
      op.leftLegPivot.rotation.x = THREE.MathUtils.lerp(op.leftLegPivot.rotation.x, 0, lerpFactor);
      op.rightLegPivot.rotation.x = THREE.MathUtils.lerp(op.rightLegPivot.rotation.x, 0, lerpFactor);
      op.leftArmPivot.rotation.x = THREE.MathUtils.lerp(op.leftArmPivot.rotation.x, 0, lerpFactor);
    }

    const targetRightArmX = op.reloading ? -0.45 : 0;
    op.rightArmPivot.rotation.x = THREE.MathUtils.lerp(op.rightArmPivot.rotation.x, targetRightArmX, lerpFactor);

    if (op.healAura.visible) {
      op.healAura.rotation.z += dt * 3.5;
    }
  }

  // 弾道エフェクト更新
  for (let i = tracers.length - 1; i >= 0; i--) {
    const t = tracers[i];
    t.life -= dt;
    t.line.material.opacity = Math.max(0, t.life / 0.12);
    if (t.life <= 0) {
      scene.remove(t.line);
      t.line.geometry.dispose();
      t.line.material.dispose();
      tracers.splice(i, 1);
    }
  }

  // 着弾パーティクル更新
  for (let i = impactParticles.length - 1; i >= 0; i--) {
    const pt = impactParticles[i];
    pt.life -= dt;
    pt.vel.y -= 15 * dt;
    pt.mesh.position.addScaledVector(pt.vel, dt);
    pt.mesh.material.opacity = Math.max(0, pt.life / 0.32);
    if (pt.life <= 0) {
      scene.remove(pt.mesh);
      pt.mesh.geometry.dispose();
      pt.mesh.material.dispose();
      impactParticles.splice(i, 1);
    }
  }

  // 薬莢エフェクト更新
  for (let i = shellCasings.length - 1; i >= 0; i--) {
    const sc = shellCasings[i];
    sc.life -= dt;
    sc.vel.y -= 14 * dt;
    sc.mesh.position.addScaledVector(sc.vel, dt);
    sc.mesh.rotation.x += dt * 16;
    sc.mesh.rotation.z += dt * 12;
    if (sc.life <= 0) {
      scene.remove(sc.mesh);
      sc.mesh.geometry.dispose();
      sc.mesh.material.dispose();
      shellCasings.splice(i, 1);
    }
  }

  renderer.render(scene, camera);
}

requestAnimationFrame(animate);
