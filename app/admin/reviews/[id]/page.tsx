import { getDraftForReview } from "./actions";
import ReviewArticleClient from "./ReviewArticleClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ReviewArticlePage({ params }: Props) {
  const { id } = await params;

  const draft = await getDraftForReview(id);

  return <ReviewArticleClient draft={draft} />;
}
