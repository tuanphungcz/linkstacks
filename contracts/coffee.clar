;; counter variable
(define-data-var counter uint u0)

;; contract owner constant
(define-constant CONTRACT_OWNER tx-sender)

;; map index to coffees
(define-map coffees uint {
  name: (string-utf8 100),
  message: (string-utf8 500)
})

;; get total index
(define-read-only (get-index)
  (ok (var-get counter)))

;; readonly function to get the coffee at a given index
(define-read-only (get-coffee (id uint))
    (map-get? coffees id)
)

;; private increment method the counter index
(define-private (increment-index)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))))


;; public buy me a coffee method 
(define-public (buy-coffee (message (string-utf8 500))  (name (string-utf8 100)) (price uint))
  (let ((id (unwrap! (increment-index) (err u0))))

    (print { message: message, id: id, name: name, price: price })

    (try! (stx-transfer? price tx-sender CONTRACT_OWNER))
    (map-set coffees id { message: message, name: name } )

    (ok "Thank you for a coffee")
    )
)