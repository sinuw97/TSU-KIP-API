export function extractAngkatanProdi(nim) {
  const angkatan = `20${nim.slice(0, 2)}`;
  const kodeProdi = nim.slice(2, 3);
  let prodi = '';

  if (kodeProdi === '4') {
    prodi = 'Sistem Informasi';
  }
  else {
    prodi = 'Informatika';
  }

  return { angkatan, prodi };
}
