import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import usePageTitle from '../lib/usePageTitle';

export default function NotFoundPage() {
  usePageTitle('Page not found — SWO, Dr. AIT');
  return (
    <PageHeader title="Page not found" intro="The page you’re looking for doesn’t exist or has moved." image="campus/main-block.webp">
      <div className="flex flex-wrap gap-3">
        <Button to="/" variant="light" size="lg">Go home</Button>
        <Button to="/clubs" variant="glass" size="lg">Browse clubs</Button>
      </div>
    </PageHeader>
  );
}
