import { getDraftForReview } from "./actions";
import ReviewArticleClient from "./ReviewArticleClient";

interface Props {
  params: { id: string };
}

export default async function ReviewArticlePage({ params }: Props) {
  const draft = await getDraftForReview(params.id);

  return <ReviewArticleClient draft={draft} />;
}
