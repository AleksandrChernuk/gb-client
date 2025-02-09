export default function createPassList({ adult, children }: { adult: number; children: number }) {
  const pass = [];

  for (let i = 0; i < adult; i += 1) {
    pass.push({
      id: `${i + 1}`,
      name: '',
      surname: '',
      date: '',
      birthday: '',
      notes: '',
      discount: '',
      isChildren: false,
      seat: '',
    });
  }

  for (let i = 0; i < children; i += 1) {
    pass.push({
      id: `${11 + 1}`,
      name: '',
      surname: '',
      date: '',
      birthday: '',
      notes: '',
      discount: '',
      isChildren: true,
      seat: '',
    });
  }
  return pass;
}
