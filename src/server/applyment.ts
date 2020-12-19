import { DApplyment } from './models';

function bossAccept(applyment: DApplyment) {
    applyment.state = 1
    applyment.save()
}
function bossRefuse(applyment: DApplyment) {
    applyment.state = 4
    applyment.save()
}
