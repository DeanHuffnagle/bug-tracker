	
cache.updateQuery({ query: FindCommentsByTicketDocument, variables: {ticketId: 8}}, (data) => {
  return { ...data, comments: [...data?.comments?, result?.comment?] }
})