let OfficeEditInlineDirective = function(
    FormBuilderService,
    OfficeService,
    MediaService,
    $timeout,
    $scope
) {
    let $ctrl = {
        media: false
    };

    let init = false;
    let timeout;

    $ctrl.office = $scope.office;

    $ctrl.selectPhoto = (e) => {
        MediaService.store('office_photo', e.target.files[0]).then(function(res) {
            $ctrl.media = res.data.data;
            $ctrl.form.values.media_uid = $ctrl.media.uid;
        });
    };

    $scope.$watch('$ctrl.form.values', function(_new, _old) {
        if (!init) {
            return init = true;
        }

        if (timeout) {
            $timeout.cancel(timeout);
        }

        timeout = $timeout(() => {
            $ctrl.form.submit();
            timeout = false;
        }, 1000);
    }, true);

    $ctrl.$onInit = function() {
        let values = OfficeService.apiResourceToForm(
            $scope.office || {}
        );

        $ctrl.form = FormBuilderService.build(values, (form) => {
            let promise;

            form.lock();

            if ($ctrl.office) {
                promise = OfficeService.update(
                    $scope.organizationId,
                    $ctrl.office.id,
                    form.values
                )
            } else {
                promise = OfficeService.store(
                    $scope.organizationId,
                    form.values
                )
            }

            promise.then((res) => {
                $ctrl.saved = true;
                form.unlock();

                $timeout(() => {
                    $ctrl.saved = false;
                }, 2000);
            }, (res) => {
                form.errors = res.data.errors;
                form.unlock();
            });
        });

        if ($ctrl.office && $ctrl.office.photo) {
            MediaService.read($ctrl.office.photo.uid).then((res) => {
                $ctrl.media = res.data.data;
            });
        }
    };

    $ctrl.$onInit();

    $scope.$ctrl = $ctrl;
};

module.exports = () => {
    return {
        scope: {
            office: "=",
            organizationId: "=",
        },
        restrict: "EA",
        controller: [
            'FormBuilderService',
            'OfficeService',
            'MediaService',
            '$timeout',
            '$scope',
            OfficeEditInlineDirective
        ],
        replace: true,
        templateUrl: 'assets/tpl/directives/office-edit-inline.html'
    };
};