async findByOwner(ownerId: number) {
  return this.repo.findOne({
    where: { owner: { id: ownerId } },
    relations: ['ratings', 'ratings.user']
  });
}
async getStoreAverageRating(ownerId: number) {
  const store = await this.findByOwner(ownerId);
  if (!store) return 0;

  const result = await this.repo.query(`
    SELECT AVG(score) as avg
    FROM ratings
    WHERE storeId = ?
  `, [store.id]);

  return parseFloat(result[0].avg) || 0;
}

