import {
  errorResult,
  ItemCreateDto,
  Result,
  Set,
  SetCreateDto,
  successResult,
} from "./types";

export const parsePage = async (
  pageContent: string
): Promise<Result<SetCreateDto, Error>> => {
  const pattern =
    /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/;
  const match = pattern.exec(pageContent);

  if (match) {
    try {
      const data = match[1];
      const response = JSON.parse(data);
      const dehydratedReduxStateKey = JSON.parse(
        response.props.pageProps.dehydratedReduxStateKey
      );
      const setData = await mapQuizletSetToSet(dehydratedReduxStateKey);
      return successResult(setData);
    } catch (err: any) {
      return errorResult("Page parsing", `Failed to parse: ${err.message}`);
    }
  } else {
    return errorResult("Page parsing", "Parse pattern not found");
  }
};

async function mapQuizletSetToSet(state: any): Promise<SetCreateDto> {
  return {
    title: state.setPage.set.title,
    items: state.studyModesCommon.studiableData.studiableItems.map(
      (item: any) => ({
        text: item.cardSides[0]?.media[0]?.plainText || "",
        definition: item.cardSides[1]?.media[0]?.plainText || "",
        image: item.cardSides[1]?.media[1]?.url,
        textTtsUrl: item.cardSides[0]?.media[0]?.ttsUrl,
        definitionTtsUrl: item.cardSides[1]?.media[0]?.ttsUrl,
      })
    ),
  };
}
