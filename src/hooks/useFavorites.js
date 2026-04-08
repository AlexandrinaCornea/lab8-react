import { useEffect, useState } from "react";

const storageKey = "lab8-fbi-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites((current) => {
      const exists = current.some((favorite) => favorite.uid === item.uid);
      if (exists) {
        return current.filter((favorite) => favorite.uid !== item.uid);
      }

      return [
        {
          uid: item.uid,
          title: item.title,
          description: item.description,
          details: item.details,
          url: item.url,
          pathId: item.pathId,
          images: item.images,
          field_offices: item.field_offices,
          poster_classification: item.poster_classification,
          publication: item.publication,
          reward_text: item.reward_text,
          warning_message: item.warning_message,
          subjects: item.subjects,
          aliases: item.aliases,
        },
        ...current,
      ];
    });
  };

  const isFavorite = (item) =>
    favorites.some((favorite) => favorite.uid === item.uid);

  return { favorites, toggleFavorite, isFavorite };
}
