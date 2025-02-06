import NavBar from '../components/NavBar';
import Table from '../components/Table';

export default function MyPage() {
  return (
    <>
      <NavBar isEditor={false} />
      <Table />
    </>
  );
}
