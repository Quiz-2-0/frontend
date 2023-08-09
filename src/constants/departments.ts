interface IDepartment {
  id: number;
  name: string;
}

const departments: IDepartment[] = [
  {
    name: 'Все отделы',
    id: 0,
  },
  {
    name: 'Маркетинг',
    id: 1,
  },
  {
    name: 'Финансовый отдел',
    id: 2,
  },
  {
    name: 'Отдел продаж',
    id: 3,
  },
  {
    name: 'HR',
    id: 3,
  },
];

export default departments;
