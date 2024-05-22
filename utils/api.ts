const getURL = (path: string) => window.location.origin + path;

// Replaced by server actions

// export const createNewEntry = async () => {
//   const response = await fetch(getURL('/api/journal'), {
//     method: 'POST',
//   });

//   if (response.ok) {
//     const { data } = await response.json();
//     return data;
//   }
// };

// export const updateEntry = async (id: string, content: string) => {
//   const res = await fetch(
//     new Request(`/api/journal/${id}`, {
//       method: 'PATCH',
//       body: JSON.stringify({ content }),
//     })
//   );

//   if (res.ok) {
//     const { data } = await res.json();
//     return data;
//   }
// };

export const askQuestion = async (question: string) => {
  const response = await fetch(getURL('/api/question'), {
    method: 'POST',
    body: JSON.stringify({ question }),
  });

  if (response.ok) {
    const { data } = await response.json();
    return data;
  }
};
