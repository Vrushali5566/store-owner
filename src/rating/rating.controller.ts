@Get('owner/my-store')
@Roles('owner')
listForOwnerStore(@Request() req) {
  return this.ratingsService.listForOwnerStore(req.user.id);
}
